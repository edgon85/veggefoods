import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { BusquedaService } from '../../../services/busqueda.service';
import { pluck, switchMap } from 'rxjs/operators';
import { ProductoModel } from '../../../models/product.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  //

  busquedas: ProductoModel[] = [];
  isSearching: boolean = false;

  inputSucio = false;
  txtProductoEncontrado = 'Resultado de busquedas';

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  input$: Observable<KeyboardEvent>;

  constructor(private route: Router, private searchService: BusquedaService) {}

  ngOnInit() {
    this.inputSearch();
  }

  inputSearch() {
    this.input$ = fromEvent<KeyboardEvent>(
      this.searchInput.nativeElement,
      'keyup'
    );

    this.input$
      .pipe(
        pluck<KeyboardEvent, string>('target', 'value'),
        switchMap<string, Observable<ProductoModel[]>>((resp) => {
          // verifica si el input es mayor a uno
          this.inputSucio = resp.length > 0 ? true : false;

          const search: string = resp.toLowerCase();
          this.isSearching = true;
          return this.searchService.getBusqueda(search);
        })
      )
      .subscribe((resp) => {
        if (resp.length === 0 && this.inputSucio) {
          this.txtProductoEncontrado = 'Producto no encontrado';
        } else {
          this.txtProductoEncontrado = 'Resultado de busquedas';
        }

        this.busquedas = resp;
        this.isSearching = false;
      });
  }

  pordDetail(prodUid: string) {
    this.route.navigateByUrl(`/producto/${prodUid}`);
  }
}

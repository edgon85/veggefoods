import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, fromEvent, Observable } from 'rxjs';
import { BusquedaService } from '../../../services/busqueda.service';
import {
  debounceTime,
  pluck,
  map,
  filter,
  mergeAll,
  switchMap,
} from 'rxjs/operators';
import { ProductoModel } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  //

  busquedas: ProductoModel[] = [];
  isSearching: boolean = false;

  productos: ProductoModel[] = [];
  cargando: boolean = false;

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchService: BusquedaService,
    private productService: ProductService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const termino = params['q'];
      // this.searchService.busquedaPorNombre(termino).subscribe(console.log);
      console.log(termino);
    });
  }

  ngOnInit() {
    this.cargando = true;
    this.obtenerDestacados();
    this.inputSearch();
  }

  inputSearch() {
    const input$ = fromEvent<KeyboardEvent>(
      this.searchInput.nativeElement,
      'keyup'
    );

    input$
      .pipe(
        pluck<KeyboardEvent, string>('target', 'value'),
        switchMap<string, Observable<ProductoModel[]>>((resp) => {
          // TODO : revisar si viene vacio mostrar mesaje que diga producto no encontrado

          this.isSearching = true;
          return this.searchService.getBusqueda(resp);
        })
      )
      .subscribe((resp) => {
        /*           if (resp === []) {
            console.log('mostrar productos descatados');
          } else {
            console.log('mostrar productos no encontrados');
          } */
        this.busquedas = resp;
        this.isSearching = false;
        console.log(resp);
      });
  }

  obtenerDestacados() {
    this.productService
      .getAllProducts()
      .pipe(map((p) => p.filter((f) => f.destacado === true)))
      .subscribe((resp) => {
        this.productos = resp;
        this.cargando = false;
      });
  }
}

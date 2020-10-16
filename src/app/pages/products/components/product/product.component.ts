import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetRutasService } from '../../../../rutas/get-rutas.service';
import { ProductService } from '../../../../services/product.service';
import { ProductoModel } from '../../../../models/product.model';
import { map, pluck, take } from 'rxjs/operators';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  categoria: string = '';

  productos: ProductoModel[] = [];
  cargando: boolean = false;

  constructor(
    private _productService: ProductService,
    private router: ActivatedRoute,
    private _getRutas: GetRutasService
  ) {
    this.obtenerUltimoParametro();
  }

  ngOnInit() {
    this.cargando = true;
    this.obtenerProductos(this.categoria);
  }

  // ========================================================== //
  // Obtener productos //
  // ========================================================== //
  obtenerProductos(categoria: string) {
    this._productService
      .getAllProducts()
      .pipe(map((p) => p.filter((f) => f.categoria === categoria)))
      .subscribe((resp) => {
        this.productos = resp.sort((a, b) => a.nombre.localeCompare(b.nombre)); // ordenar alfabeticamente
        this.cargando = false;
      });
  }

  // ========================================================== //
  // obtener el ultimo parametro de la url //
  // ========================================================== //
  obtenerUltimoParametro() {
    this._getRutas
      .getRutas()
      .pipe(
        take(1),
        pluck('path'),
        map((data) => {
          data === 'combo-fiambre'
            ? (this.categoria = 'combos')
            : (this.categoria = data.split('-').join(' '));
          // console.log();
          return data;
        })
      )
      .subscribe();
  }
}

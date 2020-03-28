import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';
import { pluck, map, mapTo, filter, mergeAll } from 'rxjs/operators';
import { CartInterface } from '../../../../interfaces/cart.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  //

  producto: ProductoModel;
  cantidadProductDetail: number = 1;

  estaEnCarrito: boolean = false;

  constructor(
    private activatedRouter: ActivatedRoute,
    private _productoService: ProductService,
    private cartService: CartService
  ) {
    this.activatedRouter.params.subscribe(param => {
      // console.log(param['slug']);
      this.obtenerProductos(param['slug']);
      // this.catUrl = param['cat'];
      // this.subCatUrl = param['subcat'];
    });
  }

  ngOnInit() {}

  // ========================================================== //
  // Obtener producto //
  // ========================================================== //
  obtenerProductos(prodId: string) {
    this._productoService.getProduct(prodId).subscribe((resp: any) => {
      this.producto = resp;
      // console.log(this.producto);
      this.revisarSiEstaEnCarrito();
    });
  }

  // ========================================================== //
  // agregar al carrito //
  // ========================================================== //
  addToCart() {
    const cart: CartInterface = {
      cartItemId: this.producto._id,
      quantity: this.cantidadProductDetail,
      product: this.producto
    };

    this.cartService.addToCart(cart);
  }

  revisarSiEstaEnCarrito() {
    this.cartService.cart$
      .pipe(mergeAll(), pluck('product', '_id'))
      .subscribe(resp => {
        if (resp === this.producto._id) {
          this.estaEnCarrito = true;
          console.log('esta en carrito: ', this.estaEnCarrito);
        }
      });
  }

  /// prueba del plunk
  /*   pruebaPlunck(prodId: string) {
    const data$ = this._productoService
      .getProduct(prodId)
      .pipe(pluck('precio'))
      .subscribe(console.log);
  } */
}

/*
        map(resp => {
          if (resp !== []) {
            mapTo(false);
            // no pasa nada
          } else {
            return 'hay data';
          }
        })
*/

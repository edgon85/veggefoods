import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoModel } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';
import { CartService } from '../../../../services/cart.service';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  //

  producto: ProductoModel;
  cantidadProductDetail: number = 1;

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
      console.log(this.producto);
    });
  }

  // ========================================================== //
  // agregar al carrito //
  // ========================================================== //
  addToCart() {
    this.cartService.addToCart(this.producto);
  }

  /// prueba del plunk
  /*   pruebaPlunck(prodId: string) {
    const data$ = this._productoService
      .getProduct(prodId)
      .pipe(pluck('precio'))
      .subscribe(console.log);
  } */
}

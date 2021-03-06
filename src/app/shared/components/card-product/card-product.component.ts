import { Component, OnInit, Input } from '@angular/core';
import { ProductoModel } from '../../../models/product.model';
import { Router } from '@angular/router';
import { CartInterface } from '../../../interfaces/cart.interface';
import { CartService } from '../../../services/cart.service';
import Swal from 'sweetalert2';
import { mergeAll, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input() producto: ProductoModel;

  estaEnCarrito: boolean = false;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.revisarSiEstaEnCarrito();
  }

  getProduct(productId: string, categoryPrd: string) {
    localStorage.setItem('redirectProd', `/productos/categoria/${categoryPrd}`);
    this.router.navigate(['/producto', productId]);
  }

  addToCart() {
    const cart: CartInterface = {
      cartItemId: this.producto._id,
      quantity: 1,
      product: this.producto
    };

    // console.log(cart);
    this.cartService.addToCart(cart);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Se agrego ${this.producto.nombre} al carrito`,
      showConfirmButton: false,
      timer: 2500
    });
  }

  revisarSiEstaEnCarrito() {
    this.cartService.cart$
      .pipe(mergeAll(), pluck('product', '_id'))
      .subscribe(resp => {
        if (resp === this.producto._id) {
          this.estaEnCarrito = true;
        }
      });
  }
}

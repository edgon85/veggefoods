import { Injectable } from '@angular/core';

import { BehaviorSubject, from } from 'rxjs';
import { CartInterface } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  /*   private products: ProductoModel[] = [];
  private cart = new BehaviorSubject<ProductoModel[]>([]); */
  private itemsCarrito: CartInterface[] = [];
  private cart = new BehaviorSubject<CartInterface[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {}

  /*   addToCart(product: ProductoModel) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  } */

  addToCart(cart: CartInterface) {
    this.itemsCarrito = [...this.itemsCarrito, cart];
    this.cart.next(this.itemsCarrito);
  }

  /**
   * clearCarrito
   */
  clearCarrito(cartItemId: string) {
    this.itemsCarrito = this.itemsCarrito.filter(
      carrito => carrito.cartItemId !== cartItemId
    );
    this.cart.next(this.itemsCarrito);
    console.log(this.itemsCarrito);
  }

  updateItemCart(cartItemId: string, newquantity: number) {
    this.itemsCarrito = [...this.itemsCarrito];
    // const filteredDataSource = this.itemsCarrito.filter(item => {
    this.itemsCarrito.filter(item => {
      if (item.cartItemId === cartItemId) {
        item.quantity = newquantity;
        item.total = item.product.precio * newquantity;
      }

      return item;
    });
    this.getTotal();
    console.log(this.itemsCarrito);
  }

  /**
   * getTotal
   */
  getTotal() {
    this.itemsCarrito = [...this.itemsCarrito];
    const subtotal = this.itemsCarrito.reduce(
      (total, cart: CartInterface) => total + cart.total,
      0
    );

    const delivery = subtotal >= 100 ? 0 : 12;
    const discount = 0.0;

    const totales = {
      subtotal_: subtotal,
      envio: delivery,
      descuento: discount
    };

    this.cart.next(this.itemsCarrito);
    console.log(totales);
    return totales;
  }
}

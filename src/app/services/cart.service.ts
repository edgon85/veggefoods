import { Injectable } from '@angular/core';

import { BehaviorSubject, from } from 'rxjs';
import { CartInterface } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemsCarrito: CartInterface[] = [];
  private cart = new BehaviorSubject<CartInterface[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {}

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
    // console.log(this.itemsCarrito);
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
    this.getSubTotal();
    // console.log(this.itemsCarrito);
  }

  /**
   * getTotal
   */
  getSubTotal() {
    this.itemsCarrito = [...this.itemsCarrito];
    const subtotal = this.itemsCarrito.reduce(
      (total, cart: CartInterface) => total + cart.total,
      0
    );
    this.cart.next(this.itemsCarrito);
    console.log(subtotal);
    return subtotal;
  }
}

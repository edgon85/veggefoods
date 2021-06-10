import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { CartInterface } from '../interfaces/cart.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private itemsCarrito: CartInterface[] = [];
  private cart = new BehaviorSubject<CartInterface[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {
    this.loadCartInLocalStorage();
  }

  addToCart(cart: CartInterface) {
    this.itemsCarrito = [...this.itemsCarrito, cart];
    this.cart.next(this.itemsCarrito);
    this.saveCartInLocalStorage();
  }

  /**
   * clearCarrito
   */
  clearCarrito(cartItemId: string) {
    this.itemsCarrito = this.itemsCarrito.filter(
      (carrito) => carrito.cartItemId !== cartItemId
    );
    this.cart.next(this.itemsCarrito);
    this.saveCartInLocalStorage();
  }

  // <======================> //
  // Limpia todo el carrito //
  // <======================> //
  clearAllCart() {
    this.itemsCarrito = [];
    this.cart.next([]);
    localStorage.removeItem('myCart');
  }

  updateItemCart(cartItemId: string, newquantity: number) {
    this.itemsCarrito = [...this.itemsCarrito];
    // const filteredDataSource = this.itemsCarrito.filter(item => {
    this.itemsCarrito.filter((item) => {
      if (item.cartItemId === cartItemId) {
        item.quantity = newquantity;
        item.total = item.product.precio * newquantity;
      }

      return item;
    });
    this.getSubTotal();
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
    this.saveCartInLocalStorage();
    return subtotal;
  }

  /* <=============================================================> */
  /* <============== Guardar carrito en el local storage ==========> */
  /* <=============================================================> */
  saveCartInLocalStorage() {
    localStorage.setItem('myCart', JSON.stringify(this.itemsCarrito));
  }
  /* <=============================================================> */

  /* <=============================================================> */
  /* <============== Cargar carrito del local storage ==========> */
  /* <=============================================================> */
  loadCartInLocalStorage() {
    if (localStorage.getItem('myCart')) {
      this.itemsCarrito = JSON.parse(localStorage.getItem('myCart'));
      this.cart.next(this.itemsCarrito);
    } else {
      this.itemsCarrito = [];
    }
  }
  /* <=============================================================> */
}

import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ProductoModel } from '../models/product.model';
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
}

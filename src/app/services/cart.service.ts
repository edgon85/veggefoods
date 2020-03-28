import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ProductoModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private products: ProductoModel[] = [];
  private cart = new BehaviorSubject<ProductoModel[]>([]);

  cart$ = this.cart.asObservable();

  constructor() {}

  addToCart(product: ProductoModel) {
    this.products = [...this.products, product];
    this.cart.next(this.products);
  }
}

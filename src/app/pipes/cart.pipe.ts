import { Pipe, PipeTransform } from '@angular/core';
import { ProductoModel } from '../models/product.model';
import { CartInterface } from '../interfaces/cart.interface';

@Pipe({
  name: 'cart'
})
export class CartPipe implements PipeTransform {
  transform(products: ProductoModel[]): any {
    const orderProducts: CartInterface[] = [];

    products.forEach(product => {
      const quantity = products.reduce(
        (acum, element) => (product._id === element._id ? acum + 1 : acum),
        0
      );
      if (!orderProducts.some(({ product: { _id } }) => _id === product._id)) {
        orderProducts.push({ product, quantity });
      }
    });

    return orderProducts;
  }
}

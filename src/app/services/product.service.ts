import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { ProductoModel } from '../models/product.model';
import { from, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  urlProduct = 'https://de-volada-ce752.firebaseio.com';

  constructor(private http: HttpClient) {}

  public getAllProducts() {
    let url = this.urlProduct + '/products.json';

    const $data = this.http.get(url);

    // $data.pipe(filter(p => p.destacado === false)).subscribe(console.log);
    /* 
    from($data)
      .pipe(filter(p => p.destacado === true))
      .subscribe(console.log); */

    const data = this.http.get(url).pipe(map(this.crearArreglo));

    return data;
  }

  // ====================================================
  // Conviert los datos d firebase a un arreglo para que
  // pueda recorerlos en el template
  // ====================================================
  private crearArreglo(productosObj: object) {
    const productos: ProductoModel[] = [];
    Object.keys(productosObj).forEach(key => {
      const producto: ProductoModel = productosObj[key];
      // producto.id = key;
      // console.log( producto);
      productos.push(producto);
    });

    if (productosObj === null) {
      return [];
    }
    return productos;
  }
}

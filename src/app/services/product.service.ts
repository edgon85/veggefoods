import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductoModel } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // urlProduct = 'https://de-volada-ce752.firebaseio.com';
  private urlProduct = environment.firebase.databaseURL;

  constructor(private http: HttpClient) {}

  // ==================================================== //
  // Obtiene todos los productos
  // ==================================================== //
  public getAllProducts() {
    const url =
      this.urlProduct + '/products.json?orderBy="disponible"&equalTo=true';

    const data = this.http.get(url).pipe(map(this.crearArreglo));

    return data;
  }

  // ==================================================== //
  // Obtiene todos los productos destacados
  // ==================================================== //
  public getProductosDesacados() {
    const url =
      this.urlProduct + '/products.json?orderBy="destacado"&equalTo=true';

    return this.http.get(url).pipe(
      map((data) => {
        const datos = Object.keys(data).map((k) => data[k]);
        return datos.filter((f) => f.disponible === true);
      })
    );
  }
  
  // ==================================================== //
  // Obtiene todos los productos destacados
  // ==================================================== //
  public getlistaOrganicos() {
    const url =
      this.urlProduct + '/lista-organicos.json';

    return this.http.get(url).pipe(
      map((data) => {
        const datos = Object.keys(data).map((k) => data[k]);
        // return datos.filter((f) => f.disponible === true);
        return datos;
      })
    );
  }

  // ====================================================
  // Obtiene un producto
  // ====================================================
  public getProduct(slug: string) {
    const url = this.urlProduct + `/products/${slug}.json`;

    return this.http.get(url);
  }

  // ==================================================== //
  // Conviert los datos d firebase a un arreglo para que
  // pueda recorerlos en el template
  // ==================================================== //
  private crearArreglo(productosObj: object) {
    const productos: ProductoModel[] = [];
    Object.keys(productosObj).forEach((key) => {
      const producto: ProductoModel = productosObj[key];
      productos.push(producto);
    });

    if (productosObj === null) {
      return [];
    }
    return productos;
  }
}

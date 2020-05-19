import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { ProductoModel } from '../models/product.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  //

  private urlProduct = 'https://de-volada-ce752.firebaseio.com';

  // https://de-volada-ce752.firebaseio.com/products.json?orderBy=%22nombre%22&startAt=%22chile%22&endAt=%22chile\uf8ff%22
  constructor(private http: HttpClient) {}

  public getBusqueda(termino: string) {
    const url =
      this.urlProduct +
      `/products.json?orderBy="nombre"&startAt="${termino}"&endAt="${termino}\uf8ff"`;

    if (termino === '') {
      return of([]);
    }

    return this.http.get(url).pipe(
      map((data) => {
        const resp = Object.keys(data).map((k) => data[k]);
        return resp.filter((f) => f.disponible === true);
      })
    );
  }
}
// public getSearch(start, end) {
//   return this.db.list('/products', (ref) =>
//     ref.orderByChild('nombre').startAt(start).endAt(end)
//   );
// }

// busquedaPorNombre(termino: string) {
//   return this.db
//     .list('products', (ref) => ref.orderByChild('nombre').equalTo(termino))
//     .valueChanges();
// }
// busquedaPorLetras(start, end) {
//   return this.db
//     .list('products', (ref) => ref.orderByChild('').startAt(start))
//     .valueChanges();
// }

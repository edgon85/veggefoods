import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BusquedaService {
  //

  private urlProduct = environment.firebase.databaseURL;

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

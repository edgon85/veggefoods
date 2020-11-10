import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CardsPromosService {

  private urlProduct = environment.firebase.databaseURL;

  constructor(private http: HttpClient) { }

  // ==================================================== //
  // Obtiene todos los productos
  // ==================================================== //
  public getAllCardsPromos() {

    const url = this.urlProduct + '/card-promos.json';

    const data = this.http.get(url).pipe(
      map((data) => Object.keys(data).map((k) => data[k])) // ordenar alfabeticamente
    );

    return data;

  }

}

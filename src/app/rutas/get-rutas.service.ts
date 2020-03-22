import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetRutasService {
  constructor(public route: Router, private router: ActivatedRoute) {}

  getRutas() {
    return this.route.events.pipe(
      filter(evento => evento instanceof ActivationEnd),
      filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.routeConfig)
    );
  }
}

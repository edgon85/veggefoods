import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CardsPromosService } from 'src/app/services/cards-promos.service';

@Component({
  selector: 'app-home-cards',
  templateUrl: './home-cards.component.html',
  styleUrls: ['./home-cards.component.scss']
})
export class HomeCardsComponent implements OnInit {


  promos$: Observable<any[]>;

  constructor(private cardsPromosService: CardsPromosService, private router: Router) { }

  ngOnInit() {
    this.obtenerPromos();
  }



  // ==================================================== //
  // Obtiene todas las promos
  // ==================================================== //
  obtenerPromos() {
    this.promos$ = this.cardsPromosService.getAllCardsPromos();
  }

  // ==================================================== //
  // Navega hacia la url
  // ==================================================== //
  naviagatePromo(urlProduct: string) {
    // this.router.navigateByUrl(`/producto/${product}`);
    this.router.navigateByUrl(`${urlProduct}`);
  }

}

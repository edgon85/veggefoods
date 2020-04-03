import { Component, OnInit, Input } from '@angular/core';
import { CartInterface } from '../../../interfaces/cart.interface';
import { map } from 'rxjs/operators';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-total-cart-detail',
  templateUrl: './total-cart-detail.component.html',
  styleUrls: ['./total-cart-detail.component.scss']
})
export class TotalCartDetailComponent implements OnInit {
  //

  subtotal: number = 0;
  delivery: number = 0;
  discount: number = 0;
  total: number = 0;

  constructor(private _cartService: CartService) {
    this.obtenerResultados();
  }

  ngOnInit() {}

  obtenerResultados() {
    this._cartService.cart$
      .pipe(
        map(data =>
          data.reduce((total, cart: CartInterface) => total + cart.total, 0)
        )
      )
      .subscribe(result => {
        this.subtotal = result;
        this.delivery = result >= 100 ? 0 : 12;
        this.discount = 0;
        this.total = result > 0 ? result + this.delivery - this.discount : 0;
        // console.log(this.subtotal);
      });
  }
}

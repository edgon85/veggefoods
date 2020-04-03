import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges
} from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { CartInterface } from '../../../interfaces/cart.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  //

  cantidadProductCart: number = 1;

  products$: Observable<CartInterface[]>;

  constructor(private _cartService: CartService) {
    this.products$ = _cartService.cart$;
  }

  ngOnInit() {}

  deleteToCart(cartItemId: string) {
    this._cartService.clearCarrito(cartItemId);
    // console.log(cartItemId);
  }
}

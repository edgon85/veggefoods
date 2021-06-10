import {
  Component,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  OnChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../../../services/cart.service';
import { CartInterface } from '../../../../interfaces/cart.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  //

  cantidadProductCart: number = 1;

  products$: Observable<CartInterface[]>;

  constructor(private _cartService: CartService, private router: Router) {
    this.products$ = _cartService.cart$;
  }

  ngOnInit() {}

  deleteToCart(cartItemId: string) {
    this._cartService.clearCarrito(cartItemId);
  }

  checkout() {
    this.router.navigateByUrl('/cart/checkout');
    localStorage.setItem('ckeckoutUrl', '/cart/checkout');
  }
}

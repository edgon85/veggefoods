import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { CartInterface } from '../../../interfaces/cart.interface';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  //

  // photo: string = 'assets/images/product-1.jpg';
  photo: string = 'https://via.placeholder.com/150';

  products$: Observable<CartInterface[]>;

  constructor(private _cartService: CartService) {
    this.products$ = _cartService.cart$;
    this.products$.subscribe(console.log);
  }

  ngOnInit() {}
}

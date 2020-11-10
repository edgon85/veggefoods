import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Observable } from 'rxjs';
import { OrderInterface } from '../../../../interfaces/order.interface';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  //

  orders$: Observable<OrderInterface[]>;
  cargando: boolean = false;
  pedidoDetalle: boolean = false;

  userUid: string = '';

  order$: Observable<OrderInterface>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargando = true;
    this.obtenerPedidos();
  }

  /* <====================================================> */
  /* <Obtener llistado de pedidos> */
  /* <====================================================> */
  obtenerPedidos() {
    this.authService.getStatus().subscribe((resp) => {
      this.userUid = resp.uid;
      this.orders$ = this.userService.getAllOrders(resp.uid);
      this.cargando = false;
    });
  }

  /* <====================================================> */
  /* Detalle de pedido */
  /* <====================================================> */
  verDetalle(orderId: string) {
    this.router.navigateByUrl(`/cuenta/pedidos/${orderId}`);
  }
}

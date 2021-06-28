import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { Observable } from 'rxjs';
import { OrderInterface } from '../../../../interfaces/order.interface';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

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
    private userService: UserService,
    private afAuth: AngularFireAuth,
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

    this.afAuth.auth.onAuthStateChanged(
      (user) => {
        if (user.uid) {
          this.userUid = user.uid;
          this.orders$ = this.userService.getAllOrders(user.uid);
          this.cargando = false;
        } else {
          console.log(';-)')
        }
      }
    );
    /* this.authService
      
      .getStatus()
      .pipe(
        map((resp) => {
          if (resp.uid) {
            this.userUid = resp.uid;
            this.orders$ = this.userService.getAllOrders(resp.uid);
            this.cargando = false;
          }
        })
      )
      .subscribe(); */
  }

  /* <====================================================> */
  /* Detalle de pedido */
  /* <====================================================> */
  verDetalle(orderId: string) {
    this.router.navigateByUrl(`/cuenta/pedidos/${orderId}`);
  }
}

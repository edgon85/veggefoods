import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { OrderInterface } from '../../../../interfaces/order.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['../order-list/order-list.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  //

  cargando: boolean = false;

  userUid: string = '';

  pedidoDetalle: boolean = false;

  order: OrderInterface;
  orderId: string;

  // estado de la orden
  myOrderStatus: string = '';
  myOrderId: string = '';

  orderProcessed: boolean = false;
  orderShipped: boolean = false;
  orderInRoute: boolean = false;
  orderArrived: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private userService: UserService,
    private afAuth: AngularFireAuth,
  ) {
    this.router.params.subscribe((resp) => (this.orderId = resp['id']));
  }

  ngOnInit() {
    this.cargando = true;
    this.afAuth.auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.userUid = user.uid;
          this.verDetalle(this.userUid, this.orderId);
        }
        else {
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
            this.verDetalle(this.userUid, this.orderId);
          }
        })
      )
      .subscribe();*/
  } 

  /* <====================================================> */
  /* Detalle de pedido */
  /* <====================================================> */
  verDetalle(userId: string, orderId: string) {
    this.pedidoDetalle = true;

    this.userService
      .getOrderItem(userId, orderId)
      .pipe(
        map((data) => {
          this.myOrderStatus = data.status;
          this.getOrderStatus(this.myOrderStatus);
          return data;
        })
      )
      .subscribe((resp) => {
        this.order = resp;
        this.cargando = false;
      });
  }

  regresar() {
    this.route.navigateByUrl('/cuenta/pedidos');
  }

  getOrderStatus(status: string) {
    switch (status) {
      case 'processed':
        this.orderProcessed = true;
        break;
      case 'shipped':
        this.orderProcessed = true;
        this.orderShipped = true;
        break;
      case 'inroute':
        this.orderProcessed = true;
        this.orderShipped = true;
        this.orderInRoute = true;
        break;
      case 'arrived':
        this.orderProcessed = true;
        this.orderShipped = true;
        this.orderInRoute = true;
        this.orderArrived = true;
        break;
    }
  }
}

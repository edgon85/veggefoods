import { Injectable } from '@angular/core';

import { UsuarioModel } from '../interfaces/user.interface';
import { Checkout } from '../interfaces/checkout.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CartService } from './cart.service';
import { Observable, throwError } from 'rxjs';
import { OrderInterface } from '../interfaces/order.interface';
import { catchError, map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // /users/UxYEyuY2LLbXvsfOOXrr8wWHX5P2/order/1586759781169

  private itemsCollection: AngularFirestoreCollection<OrderInterface>;
  items: Observable<OrderInterface[]>;

  private itemDoc: AngularFirestoreDocument<OrderInterface>;
  item: Observable<OrderInterface>;

  constructor(
    private afs: AngularFirestore,
    private cartService: CartService,
    private router: Router
  ) {}

  // ================================================================ //
  // Obtener usuario por uid //
  // ================================================================ //
  public getUserById(uid: string) {
    return this.afs
      .doc<UsuarioModel>(`users/${uid}`)
      .valueChanges()
      .pipe(
        catchError((error) => {
          return throwError('chido!');
        }),
        map((resp) => resp)
      );
  }

  // ================================================================ //
  // Crear orden en usuario //
  // ================================================================ //
  public sendOrder(userUid: string, order: Checkout) {
    const orderRef: AngularFirestoreDocument = this.afs.doc(
      `users/${userUid}/order/${order.$key}`
    );

    return orderRef
      .set(order)
      .then(() => {
        this.createNewOrder(order);
      })
      .catch((err) => {
        Swal.fire('OOOPS!', 'ocurrio un error', 'error');
      });
  }

  // ================================================================ //
  // Crear orden en usuario //
  // ================================================================ //
  createNewOrder(order: Checkout) {
    const orderRef: AngularFirestoreDocument = this.afs.doc(
      `orders/${order.$key}`
    );

    return orderRef.set(order).then(() => {
      Swal.fire('Enviado!', 'Su pedido se ha procesado', 'success');
      this.cartService.clearAllCart();
      this.router.navigateByUrl(`/cuenta/pedidos/${order.$key}`);
    });
  }

  updateUser(userUId: string, user: object) {
    return this.afs.doc(`users/${userUId}`).update(user);
  }

  // ================================================================ //
  // Obtener pedidos //
  // ================================================================ //
  getAllOrders(userUid: string) {
    this.itemsCollection = this.afs
      .collection<OrderInterface>('users')
      .doc(userUid)
      .collection('order', (ref) => ref.orderBy('$key', 'desc'));
    this.items = this.itemsCollection.valueChanges();

    return this.items;
  }

  // ================================================================ //
  // Obtener un pedido //
  // ================================================================ //

  // /users/UxYEyuY2LLbXvsfOOXrr8wWHX5P2/order/1586759781169
  getOrderItem(userUid: string, orderId: string) {
    /*     this.itemDoc = this.afs.doc<OrderInterface>(
      `users/${userUid}/order/${orderId}`
    );
    this.item = this.itemDoc.valueChanges(); */
    return this.afs
      .doc<OrderInterface>(`users/${userUid}/order/${orderId}`)
      .valueChanges();
  }

  // ================================================================ //
  // Crear orden en usuario //
  // ================================================================ //
  public createCuponInUser(userUid: string, data: object) {
    const cuponRef: AngularFirestoreDocument = this.afs.doc(
      `users/${userUid}/cupones/${data['id']}`
    );

    return cuponRef.set(data).then(() => {});
  }
}

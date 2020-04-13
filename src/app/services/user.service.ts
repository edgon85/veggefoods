import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from 'angularfire2/firestore';
import { UsuarioModel } from '../interfaces/user.interface';
import { Checkout } from '../interfaces/checkout.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private afs: AngularFirestore,
    private cartService: CartService,
    private router: Router
  ) {}

  // ================================================================ //
  // Obtener usuario por uid //
  // ================================================================ //
  public getUserById(uid: string) {
    return this.afs.doc<UsuarioModel>(`users/${uid}`).valueChanges();
  }

  // ================================================================ //
  // Obtener usuario por uid //
  // ================================================================ //
  public sendOrder(userUid: string, order: Checkout) {
    const orderRef: AngularFirestoreDocument = this.afs.doc(
      `users/${userUid}/order/${order.$key}`
    );

    return orderRef
      .set(order)
      .then(() => {
        Swal.fire('Enviado!', 'Su pedido se a procesado', 'success');
        this.cartService.clearAllCart();
        this.router.navigateByUrl('/inicio');
      })
      .catch((err) => {
        Swal.fire('OOOPS!', 'ocurrio un error', 'error');
        console.log(err);
      });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root',
})
export class CuponService {
  constructor(private afs: AngularFirestore) {}

  // ================================================================ //
  // Obtener cupon //
  // ================================================================ //
  public getCupon(cuponId: string) {
    return this.afs.doc(`cupones/${cuponId}`).valueChanges();
  }

  // /users/UxYEyuY2LLbXvsfOOXrr8wWHX5P2/cupones/primera-compra
  public getCuponUser(userUid: string, cuponId: string) {
    return this.afs.doc(`users/${userUid}/cupones/${cuponId}`).valueChanges();
  }
}

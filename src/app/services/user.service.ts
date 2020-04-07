import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UsuarioModel } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afs: AngularFirestore) {}

  // ================================================================ //
  // Obtener usuario por uid //
  // ================================================================ //
  public getUserById(uid: string) {
    return this.afs.doc<UsuarioModel>(`users/${uid}`).valueChanges();
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  // ========================================= //
  // ccrear cuenta //
  // ========================================= //
  public createAcount(usuario: UsuarioModel) {
    return this.afAuth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then((resp) => {
        this.createUserData(resp.user.uid, usuario);
      });
  }

  // ========================================= //
  // Login con email y password //
  // ========================================= //
  public loginWithEmailAndPassword(usuario: UsuarioModel) {
    return this.afAuth.signInWithEmailAndPassword(
      usuario.email,
      usuario.password
    );
  }

  // ========================================= //
  // Obtener el estado del usuario //
  // ========================================= //
  public getStatus() {
    return this.afAuth.authState.pipe(
      catchError((error) => {
        return throwError('chido!');
      }),
      map((resp) => resp)
    );
  }

  // ========================================= //
  // obtener el usuario logueado //
  // ========================================= //
  public getuser() {
    return this.afAuth.user.pipe(
      catchError((error) => {
        return throwError('chido!');
      }),
      map((resp) => resp)
    );
  }

  // ========================================= //
  // cerrar sesión //
  // ========================================= //
  public logout() {
    return this.afAuth.signOut();
  }

  // ========================================= //
  // actualizar usuario //
  // ========================================= //
  private createUserData(id: string, usuario: UsuarioModel) {
    const userRef: AngularFirestoreDocument = this.afs.doc(`users/${id}`);
    //
    const date = new Date();

    const data = {
      email: usuario.email,
      nombre: usuario.nombre,
      uid: id,
      direccion: '',
      telefono: '',
      timestamp: date.toString(),
    };
    return userRef.set(data, { merge: true });
  }

  // ========================================= //
  // actualizar usuario //
  // ========================================= //

  public resetPassword(email: string) {
    return this.afAuth.sendPasswordResetEmail(email);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../interfaces/user.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
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
    return this.afAuth.auth
      .createUserWithEmailAndPassword(usuario.email, usuario.password)
      .then(resp => {
        this.createUserData(resp.user.uid, usuario);
      });
  }

  // ========================================= //
  // Login con email y password //
  // ========================================= //
  public loginWithEmailAndPassword(usuario: UsuarioModel) {
    return this.afAuth.auth.signInWithEmailAndPassword(
      usuario.email,
      usuario.password
    );
  }

  // ========================================= //
  // Obtener el estado del usuario //
  // ========================================= //
  public getStatus() {
    return this.afAuth.authState;
  }

  // ========================================= //
  // obtener el usuario logueado //
  // ========================================= //
  public getuser() {
    return this.afAuth.user;
  }

  // ========================================= //
  // cerrar sesión //
  // ========================================= //
  public logout() {
    return this.afAuth.auth.signOut();
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
      timestamp: date.toString()
    };
    return userRef.set(data, { merge: true });
  }
}
/*   private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDvhxnteaAPdTVBw6_eFoLzNerjkAlVvHw';
  private urlUsers = 'https://de-volada-ce752.firebaseio.com/users';

  userToken: string;
  userUId: string;

  constructor(private http: HttpClient, private afAuth: AngularFireAuth) {
    this.leerToken();
  }

  // <=======================================================> //
  // registrar nuevo usuario en authentication//
  // <=======================================================> //
  public register(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http
      .post(`${this.url}signUp?key=${this.apiKey}`, authData)
      .pipe(
        map(resp => {
          this.guardarToken(resp['idToken']);
          this.userUId = resp['localId'];
          return resp;
        })
      );
  }

  // <=======================================================> //
  // Login de usuario //
  // <=======================================================> //
  public login(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http
      .post(`${this.url}signInWithPassword?key=${this.apiKey}`, authData)
      .pipe(
        map(resp => {
          this.guardarToken(resp['idToken']);
          this.userUId = resp['localId'];
          return resp;
        })
      );
  }

  // <=======================================================> //
  // Logout de usuario usuario //
  // <=======================================================> //
  public logout() {
    localStorage.removeItem('token');
  }

  // <=======================================================> //
  // Guarda el token en local storage //
  // <=======================================================> //
  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const hoy = new Date();
    hoy.setSeconds(3600);

    // guarda la fecha en que expira del token
    localStorage.setItem('exp', hoy.getTime().toString());
  }

  // <=======================================================> //
  // Lee el token de localstorage //
  // <=======================================================> //
  private leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  // <=======================================================> //
  // verifica si esta autendicado //
  // <=======================================================> //
  public estaAutenticado(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }

    const expira = Number(localStorage.getItem('exp'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if (expira > Number(new Date())) {
      return true;
    } else {
      return false;
    }
  }

  // <=======================================================> //
  // Crear nuevo usuario en database//
  // <=======================================================> //
  public crearNuevoUsuario(id: string, usuario: UsuarioModel) {
    const date = new Date();
    const userData = {
      email: usuario.email,
      // password: '',
      nombre: usuario.nombre,
      uid: id,
      telefono: '',
      direccion: '',
      timestamp: date.toString(),
      created_date: date.toString()
    };

    return this.http.put(`${this.urlUsers}/${id}.json`, userData);
  }

  public getUserByID(uid: string) {
    const url = 'https://de-volada-ce752.firebaseio.com/users';
    return this.http.get(`${this.urlUsers}/${uid}.json`);
  } */

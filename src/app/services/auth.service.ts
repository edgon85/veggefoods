import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../interfaces/user.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private apiKey = 'AIzaSyDvhxnteaAPdTVBw6_eFoLzNerjkAlVvHw';

  userToken: string;

  constructor(private http: HttpClient) {
    this.leerToken();
  }

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
          return resp;
        })
      );
  }

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
          return resp;
        })
      );
  }

  public logout() {
    localStorage.removeItem('token');
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const hoy = new Date();
    hoy.setSeconds(3600);

    // guarda la fecha en que expira del token
    localStorage.setItem('exp', hoy.getTime().toString());
  }

  private leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

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
}

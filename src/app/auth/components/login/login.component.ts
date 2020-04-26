import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../interfaces/user.interface';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.scss'],
})
export class LoginComponent implements OnInit {
  //

  usuario: UsuarioModel = new UsuarioModel();
  recordarme: boolean = false;
  redirectCheckoutURL: string = '';

  constructor(private auth: AuthService, private router: Router) {
    //

    if (localStorage.getItem('ckeckoutUrl') !== null) {
      this.redirectCheckoutURL = localStorage.getItem('ckeckoutUrl');
    } else {
      this.redirectCheckoutURL = '/inicio';
    }
  }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(forma: NgForm) {
    //

    if (forma.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere por favor...',
      icon: 'info',
    });
    Swal.showLoading();

    this.auth
      .loginWithEmailAndPassword(this.usuario)
      .then((resp) => {
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl(this.redirectCheckoutURL);
      })
      .catch((err) => {
        // console.log(err), Swal.close();
        Swal.fire({
          title: 'Error al autenticar',
          text: this.handleErrorAuth(err.code),
          icon: 'error',
          showConfirmButton: true,
        });
      });
  }

  handleErrorAuth(error: string): string {
    let _authError: string;

    switch (error) {
      case 'auth/user-not-found':
        _authError = 'El usuario con este correo electrónico no existe.';
        break;
      case 'auth/wrong-password':
        _authError = 'Su contraseña es incorrecta.';
        break;
      case 'auth/user-disabled':
        _authError =
          'El usuario con este correo electrónico ha sido deshabilitado.';
        break;
      case 'auth/too-many-requests':
        _authError = 'Demasiadas solicitudes Intenta nuevamente más tarde.';
        break;
      case 'auth/operation-not-allowed':
        _authError =
          'Iniciar sesión con correo electrónico y contraseña no está habilitado.';
        break;
      default:
        _authError = 'Ocurrió un error :(';
    }
    return _authError;
  }
}

/*

        String _authError;
        switch (code) {
          case "ERROR_INVALID_EMAIL":
            _authError =
            "Su dirección de correo electrónico parece estar mal formada.";
            break;
          case "ERROR_EMAIL_ALREADY_IN_USE":
            _authError =
            "La dirección de correo electrónico ya está en uso por otra cuenta.";
            break;
          case "ERROR_WRONG_PASSWORD":
            _authError = "Su contraseña es incorrecta";
            break;
          case "ERROR_USER_NOT_FOUND":
            _authError = "El usuario con este correo electrónico no existe.";
            break;
          case "ERROR_USER_DISABLED":
            _authError =
            "El usuario con este correo electrónico ha sido deshabilitado.";
            break;
          case "ERROR_TOO_MANY_REQUESTS":
            _authError = "Demasiadas solicitudes Intenta nuevamente más tarde.";
            break;
          case "ERROR_OPERATION_NOT_ALLOWED":
            _authError =
            "Iniciar sesión con correo electrónico y contraseña no está habilitado.";
            break;
          default:
            _authError = "Ocurrió un error :(";
        }
        return _authError;
*/

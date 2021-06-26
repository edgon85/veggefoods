import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //

  user: UsuarioModel;

  formLogin: FormGroup;

  myPatern: string =
    "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.][a-zA-Z]{2,}$";

  redirectCheckoutURL: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.initFormRegister();

    if (localStorage.getItem('ckeckoutUrl') !== null) {
      this.redirectCheckoutURL = localStorage.getItem('ckeckoutUrl');
    } else {
      this.redirectCheckoutURL = '/inicio';
    }
  }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.formLogin.reset({
        email: localStorage.getItem('email'),
        userRemember: true,
      });
    }
  }

  initFormRegister() {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.myPatern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userRemember: [false],
    });
  }

  /* <==============================> */
  /* <======Button Login============> */
  /* <==============================> */
  btnlogin() {
    if (this.formLogin.invalid) {
      return Object.values(this.formLogin.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((resp) =>
            resp.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.formLogin.valid) {
      this.login();
    }
  }
  /* <==============================> */

  /* <==============================> */
  /* <========Make Login===========> */
  /* <==============================> */
  login() {
    const userData = this.formLogin.value;
    this.user = {
      nombre: '',
      email: userData.email.toLowerCase().trim(),
      password: userData.password.trim(),
    };

    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere por favor...',
      icon: 'info',
    });
    Swal.showLoading();

    this.auth
      .loginWithEmailAndPassword(this.user)
      .then((resp) => {
        Swal.close();
        if (this.formLogin.value.userRemember) {
          localStorage.setItem('email', this.user.email);
        } else if (
          !this.formLogin.value.userRemember &&
          localStorage.getItem('email')
        ) {
          localStorage.removeItem('email');
        }
        this.router.navigateByUrl(this.redirectCheckoutURL);
      })
      .catch((err) => {
        Swal.fire({
          title: 'Error al autenticar',
          text: this.handleErrorAuth(err.code),
          icon: 'error',
          showConfirmButton: true,
        });
      });
  }
  /* <==============================> */

  /* <=====================================================> */
  /* <========Validate Field email and password ===========> */
  /* <=====================================================> */
  validateField(nombre: string) {
    return (
      this.formLogin.get(nombre).invalid && this.formLogin.get(nombre).touched
    );
  }
  /* <=====================================================> */

  /* <=====================================================> */
  /* <================ Button forgot password =============> */
  /* <=====================================================> */
  forgotPassword() {
    Swal.fire({
      /* title: 'Introduce tu correo electrónico',
      text: 'Le enviaremos un correo electrónico para cambiar su contraseña.', */
      html: `<h5>Introdusca su correo electrónico</h5> <br>Le enviaremos un correo electrónico para cambiar su contraseña.`,
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.value) {
        this.auth
          .resetPassword(result.value)
          .then((resp) => {
            Swal.fire({
              html: `<h5>${result.value}</h5> <br>Consultar su correo electrónico`,
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire(this.handleErrorForgotPassword(err.code));
          });
      }
    });
  }
  /* <=====================================================> */

  /* <================Handle Errors =============> */
  handleErrorForgotPassword(error: string): string {
    const DEFAULT_ERROR = 'Ocurrió un error :(';
    const ERRORS = {
      'auth/user-not-found':
        'No hay ningún registro de usuario que corresponda a este identificador.',
    };
    return ERRORS[error] || DEFAULT_ERROR;
  }

  /* <================ Handle Errors =============> */
  handleErrorAuth(error: string): string {
    const DEFAULT_ERROR = 'Ocurrió un error :(';
    const ERRORS = {
      'auth/user-not-found':
        'El usuario con este correo electrónico no existe.',
      'auth/wrong-password': 'Su contraseña es incorrecta.',
      'auth/user-disabled':
        'El usuario con este correo electrónico ha sido deshabilitado.',
      'auth/too-many-requests':
        'Demasiadas solicitudes Intenta nuevamente más tarde.',
      'auth/operation-not-allowed':
        'Iniciar sesión con correo electrónico y contraseña no está habilitado.',
    };
    return ERRORS[error] || DEFAULT_ERROR;
  }
}

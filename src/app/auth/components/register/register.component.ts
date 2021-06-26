import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  //

  formRegister: FormGroup;

  myPatern: string =
    "[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[.][a-zA-Z]{2,}$";

  user: UsuarioModel;

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

  ngOnInit() {}

  /* <=====================================================> */
  /* <======== Form a new user acount =================> */
  /* <=====================================================> */
  initFormRegister() {
    this.formRegister = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.myPatern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  /* <=====================================================> */

  /* <=====================================================> */
  /* <======== button new user acount =================> */
  /* <=====================================================> */
  btnCreateAcount() {
    if (this.formRegister.invalid) {
      return Object.values(this.formRegister.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((resp) =>
            resp.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.formRegister.valid) {
      this.registerUser();
    }
  }
  /* <=====================================================> */

  /* <=====================================================> */
  /* <======== Register a new user acount =================> */
  /* <=====================================================> */
  registerUser() {
    const userData = this.formRegister.value;

    this.user = {
      nombre: `${userData.firstName.trim()} ${userData.lastName.trim()}`,
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
      .createAcount(this.user)
      .then((resp) => {
        Swal.close();
        this.router.navigateByUrl(this.redirectCheckoutURL);
      })
      .catch((err) => {
        Swal.close();
        Swal.fire({
          title: 'Error al crear cuenta',
          text: this.handleErrorAuth(err.code),
          icon: 'error',
          showConfirmButton: true,
        });
      });
  }
  /* <=====================================================> */

  /* <=====================================================> */
  /* <========Validate Field email and password ===========> */
  /* <=====================================================> */
  validateField(nombre: string) {
    return (
      this.formRegister.get(nombre).invalid &&
      this.formRegister.get(nombre).touched
    );
  }
  /* <=====================================================> */

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
      'auth/email-already-in-use':
        'La dirección de correo electrónico ya está en uso.',
    };
    return ERRORS[error] || DEFAULT_ERROR;
  }
}

import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../interfaces/user.interface';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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

  myPatern: string = '[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+[\.][a-zA-Z]{2,}$';

  user: UsuarioModel;

  redirectCheckoutURL: string = '';


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.initFormRegister();
    if (localStorage.getItem('ckeckoutUrl') !== null) {
      this.redirectCheckoutURL = localStorage.getItem('ckeckoutUrl');
    } else {
      this.redirectCheckoutURL = '/inicio';
    }
  }

  ngOnInit() { }

  initFormRegister() {
    this.formRegister = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.myPatern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  btnCreateAcount() {

    if (this.formRegister.invalid) {
      return Object.values(this.formRegister.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(
            (resp) => resp.markAsTouched(),
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


  validateField(nombre: string) {
    return this.formRegister.get(nombre).invalid && this.formRegister.get(nombre).touched;
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
      case 'auth/email-already-in-use':
        _authError =
          'La dirección de correo electrónico ya está en uso por otra cuenta.';
        break;
      default:
        _authError = 'Ocurrió un error :(';
    }
    return _authError;
  }

}

/*   usuario: UsuarioModel;

  recordarme: boolean = false;

  redirectCheckoutURL: string = '';

  constructor(private auth: AuthService, private router: Router) {
    if (localStorage.getItem('ckeckoutUrl') !== null) {
      this.redirectCheckoutURL = localStorage.getItem('ckeckoutUrl');
    } else {
      this.redirectCheckoutURL = '/inicio';
    }
  }

  ngOnInit() {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'edgon85@gmail.com';
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      title: 'Espere por favor...',
      icon: 'info',
    });
    Swal.showLoading();

    this.auth
      .createAcount(this.usuario)
      .then((resp) => {
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
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
      case 'auth/email-already-in-use':
        _authError =
          'La dirección de correo electrónico ya está en uso por otra cuenta.';
        break;
      default:
        _authError = 'Ocurrió un error :(';
    }
    return _authError;
  }
} */

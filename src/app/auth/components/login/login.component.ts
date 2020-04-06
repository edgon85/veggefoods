import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../interfaces/user.interface';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../register/register.component.scss']
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
      icon: 'info'
    });
    Swal.showLoading();

    this.auth
      .loginWithEmailAndPassword(this.usuario)
      .then(resp => {
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl(this.redirectCheckoutURL);
      })
      .catch(err => {
        console.log(err), Swal.close();
        Swal.fire({
          title: 'Error al autenticar',
          text: err.message,
          icon: 'error',
          showConfirmButton: true
        });
      });

    // this.auth.login(this.usuario).subscribe(
    //   resp => {
    //     console.log(resp);
    //     Swal.close();
    //     if (this.recordarme) {
    //       localStorage.setItem('email', this.usuario.email);
    //     }

    //     this.router.navigateByUrl(this.redirectCheckoutURL);
    //   },
    //   err => {
    //     console.log(err.error.error.message);
    //     Swal.fire({
    //       title: 'Error al autenticar',
    //       text: err.error.error.message,
    //       icon: 'error',
    //       showConfirmButton: true
    //     });
    //   }
    // );
  }
}

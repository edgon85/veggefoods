import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../interfaces/user.interface';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //

  usuario: UsuarioModel;

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
      icon: 'info'
    });
    Swal.showLoading();

    this.auth
      .createAcount(this.usuario)
      .then(resp => {
        Swal.close();
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl(this.redirectCheckoutURL);
      })
      .catch(err => {
        console.log(err.message);
        Swal.close();
        Swal.fire({
          title: 'Error al crear cuenta',
          text: err.message,
          icon: 'error',
          showConfirmButton: true
        });
      });
  }
}

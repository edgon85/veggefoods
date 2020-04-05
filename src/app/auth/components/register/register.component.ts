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

    this.auth.register(this.usuario).subscribe(
      resp => {
        Swal.close();

        console.log(resp);
        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email);
        }

        this.router.navigateByUrl(this.redirectCheckoutURL);
      },
      err => {
        console.log(err.error.error.message);
        Swal.fire({
          title: 'Error al autenticar',
          text: err.error.error.message,
          icon: 'error',
          showConfirmButton: true
        });
      }
    );
  }
}

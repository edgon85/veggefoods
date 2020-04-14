import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { UsuarioModel } from '../../../../interfaces/user.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  //

  usuario: UsuarioModel;

  cargando: boolean = false;

  // variable para el formulario
  forma: FormGroup;
  emailValidaror = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.cargando = true;
    this.formularioCheckout();
    this.initDataUser();
  }
  // <===============================================================> //
  // obtener uid de usuario y datos del productos //
  // <===============================================================> //
  initDataUser() {
    this.authService.getuser().subscribe((resp) => {
      this.obtenerUsuario(resp.uid);
    });
  }

  // <===============================================================> //
  // Obtener un usuario por uid de firebase y llenar el formulario
  // con sus datos //
  // <===============================================================> //
  obtenerUsuario(uid: string) {
    this.userService.getUserById(uid).subscribe((resp) => {
      this.usuario = resp;
      this.cargando = false;
      // this.forma.setValue({
      this.forma.reset({
        correo: resp.email,
        nombre: resp.nombre,
        telefono: resp.telefono,
        /* direccion: {
          departamento: Departamento.Quetzaltenango,
          municipio: Municipio.Quetzaltenango,
          zona: Zona.Zona1,
          ubicacion: '',
          referencia: '',
        },*/
      });
    });
  }

  // <===============================================================> //
  // Creacion del formulario de checkout //
  // <===============================================================> //
  formularioCheckout() {
    this.forma = this.fb.group({
      /*  correo: [
        '',
        [Validators.required, Validators.pattern(this.emailValidaror)],
      ], */
      correo: [{ value: '', disabled: true }, Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      /*     direccion: this.fb.group({
        departamento: ['', Validators.required],
        municipio: ['', Validators.required],
        zona: ['', Validators.required],
        ubicacion: ['', Validators.required],
        referencia: [''],
      }),
      fechaEntreaga: ['', Validators.required],
      hora: [], */
    });
  }

  // <===============================================================> //
  // actualizar perfil //
  // <===============================================================> //
  actualizarPerfil() {
    if (this.forma.invalid) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Llene los campos vacíos',
        showConfirmButton: false,
        timer: 1500,
      });
    }

    if (this.forma.valid) {
      const data: object = {
        nombre: this.forma.value.nombre,
        telefono: this.forma.value.telefono,
      };

      this.userService
        .updateUser(this.usuario.uid, data)
        .then((resp) => {
          Swal.fire(
            'Actualizado!',
            'Mis datos se actualizaron correctamente',
            'success'
          );
          console.log(resp);
        })
        .catch((err) => {
          Swal.fire(
            'Erro al Actualizar',
            'no se pudo actualizar, intente mas tarde',
            'error'
          );

          console.log(err);
        });

      console.log(data);
    }
  }

  // <===============================================================> //
  // Cambiar contraseña //
  // <===============================================================> //
  cambiarPassword() {
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Se le enviara un correo a ${this.usuario.email} para cambiar su contraseña`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, envíalo!',
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Enviado!',
          'Sigue las instrucciones en tu correo electrónico para cambiar tu contraseña',
          'success'
        );
      }
    });
  }
}

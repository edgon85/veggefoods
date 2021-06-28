import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { UsuarioModel } from '../../../../interfaces/user.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';

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

  minDate: Date;
  maxDate: Date;
  edadInput: Date;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private fb: FormBuilder
  ) {
    // Set the minimum to January 1st 20 years in the past and December 31st a year in the future.
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 80, 0, 1);
    // this.maxDate = new Date(currentYear + 1, 11, 31);
    this.maxDate = new Date(currentYear - 14, 11, 31);
  }

  ngOnInit() {
    this.cargando = true;
    this.formularioCheckout();
    this.initDataUser();
  }
  // <===============================================================> //
  // obtener uid de usuario y datos del productos //
  // <===============================================================> //
  initDataUser() {
    this.afAuth.auth.onAuthStateChanged(
      (user) => {
        if (user) {
          this.obtenerUsuario(user.uid);
        } else {
          console.log(';-)')
        }
      }
    );
  }

  // <===============================================================> //
  // Obtener un usuario por uid de firebase y llenar el formulario
  // con sus datos //
  // <===============================================================> //
  obtenerUsuario(uid: string) {
    this.userService.getUserById(uid)
      .pipe(
        map(
          (resp) => {
            this.usuario = resp;
            this.cargando = false;
      
            this.edadInput = new Date(resp.edad);
      
            // this.forma.setValue({
            this.forma.reset({
              correo: resp.email,
              nombre: resp.nombre,
              telefono: resp.telefono,
              edad: this.edadInput,
              /* direccion: {
                departamento: Departamento.Quetzaltenango,
                municipio: Municipio.Quetzaltenango,
                zona: Zona.Zona1,
                ubicacion: '',
                referencia: '',
              },*/
            });
          }
        )
      )
      
      .subscribe();
  }

  // <===============================================================> //
  // Creacion del formulario de checkout //
  // <===============================================================> //
  formularioCheckout() {
    this.forma = this.fb.group({
      correo: [{ value: '', disabled: true }, Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      edad: [{ value: this.edadInput, disabled: true }, , Validators.required],
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
        edad: this.edadInput,
      };

      this.userService
        .updateUser(this.usuario.uid, data)
        .then((resp) => {
          Swal.fire(
            'Actualizado!',
            'Mis datos se actualizaron correctamente',
            'success'
          );
        })
        .catch((err) => {
          Swal.fire(
            'Erro al Actualizar',
            'no se pudo actualizar, intente mas tarde',
            'error'
          );
        });
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

  // <=================================================================> //
  // obtener el cambio de fecha en datepicker
  // <=================================================================> //
  edadSelected(event: any): string {
    const data = event;

    const formattedDate = data['_d'];
    this.edadInput = formattedDate.toString();
    return formattedDate;
  }
}

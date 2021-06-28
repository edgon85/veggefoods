import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { UsuarioModel } from '../../../../interfaces/user.interface';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {
  //

  usuario: UsuarioModel;

  cargando: boolean = false;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.cargando = true;
    this.initDataUser();
  }

  // <===============================================================> //
  // obtener uid de usuario y datos del productos //
  // <===============================================================> //
  initDataUser() {

    this.afAuth.auth.onAuthStateChanged(
      (resp) => {
        if (resp) {
          this.obtenerUsuario(resp.uid);
        }
        else {
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
    this.userService.getUserById(uid).subscribe((resp) => {
      this.usuario = resp;
      this.cargando = false;
    });
  }
}

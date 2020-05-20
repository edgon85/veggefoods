import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../../../services/auth.service';
import { UsuarioModel } from '../../../../interfaces/user.interface';

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
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.cargando = true;
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
    });
  }
}

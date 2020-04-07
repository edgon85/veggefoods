import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { UsuarioModel } from '../../../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Checkout } from '../../../../interfaces/checkout.interface';
import { CartInterface } from '../../../../interfaces/cart.interface';
import { CartService } from '../../../../services/cart.service';
import {
  Departamento,
  Municipio,
  Zona
} from '../../../../interfaces/checkout.interface';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  //

  userUid: string;
  usuario$: Observable<UsuarioModel>;

  public departamento = Object.keys(Departamento).map(key => ({
    label: key,
    key: Departamento[key]
  }));

  public municipio = Object.keys(Municipio).map(key => ({
    label: key,
    key: Municipio[key]
  }));

  public zona = Object.keys(Zona).map(key => ({
    label: key,
    key: Zona[key]
  }));

  checkoutData: Checkout;
  // products$: Observable<CartInterface[]>;
  products: CartInterface[];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService
  ) {
    cartService.cart$.subscribe(resp => (this.products = resp));
    this.authService.getuser().subscribe(resp => {
      this.userUid = resp.uid;
      console.log(this.userUid);
      this.obtenerUsuario(this.userUid);
    });
  }
  ngOnInit() {
    this.checkoutData = new Checkout();
  }

  obtenerUsuario(uid: string) {
    this.userService.getUserById(uid).subscribe(resp => {
      this.checkoutData = {
        correo: resp.email,
        nombre: resp.nombre,
        telefono: resp.telefono,
        departamento: Departamento.Quetzaltenango,
        municipio: Municipio.Quetzaltenango,
        zona: Zona.Zona1,
        direccion: resp.direccion,
        referencia: '',
        totales: this.cartService.getSubTotal,
        productos: this.products,
        fechaCreacion: '',
        fechaEnvio: ''
      };
    });
  }

  logout() {
    this.authService.logout();
  }

  sendData(forma: NgForm) {
    console.log(forma.value);
  }
}

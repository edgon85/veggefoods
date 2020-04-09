import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { UsuarioModel } from '../../../../interfaces/user.interface';
import { Observable } from 'rxjs';
import { Checkout } from '../../../../interfaces/checkout.interface';
import { CartInterface } from '../../../../interfaces/cart.interface';
import { CartService } from '../../../../services/cart.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import {
  Departamento,
  Municipio,
  Zona
} from '../../../../interfaces/checkout.interface';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService
  ) {
    this.formularioCheckout();
    this.formularioPago();
    this.initDataUser();
  }
  //
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

  // checkoutData: Checkout;
  // products$: Observable<CartInterface[]>;
  products: CartInterface[];
  totales: any = {};

  // variable de totales
  subtotal: number = 0;
  delivery: number = 0;
  discount: number = 0;
  total: number = 0;

  forma: FormGroup;
  emailValidaror = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';

  // forma para metodo de pago
  formaPago: FormGroup;

  // <=================================================================> //
  // todo respecto al formulario de envio
  // <=================================================================> //
  phoneNumber = '^(+d{1,3}[- ]?)?d{10}$';

  //

  ngOnInit() {
    // this.checkoutData = new Checkout();
  }

  obtenerResultados() {
    this.cartService.cart$
      .pipe(
        map(data =>
          data.reduce((total, cart: CartInterface) => total + cart.total, 0)
        )
      )
      .subscribe(result => {
        this.subtotal = result;
        this.delivery = result >= 100 ? 0 : 12;
        this.discount = 0;
        this.total = result > 0 ? result + this.delivery - this.discount : 0;
        // console.log(this.subtotal);

        this.totales = {
          subtotal: this.subtotal,
          delivery: this.delivery,
          discount: this.discount,
          total: this.total
        };
      });
  }
  // <===============================================================> //
  // obtener uid de usuario y datos del productos //
  // <===============================================================> //
  initDataUser() {
    this.cartService.cart$.subscribe(resp => (this.products = resp));
    this.authService.getuser().subscribe(resp => this.obtenerUsuario(resp.uid));
  }

  obtenerUsuario(uid: string) {
    this.userService.getUserById(uid).subscribe(resp => {
      // this.forma.setValue({
      this.forma.reset({
        correo: resp.email,
        nombre: resp.nombre,
        telefono: resp.telefono,
        direccion: {
          departamento: Departamento.Quetzaltenango,
          municipio: Municipio.Quetzaltenango,
          zona: Zona.Zona1,
          ubicacion: '',
          referencia: ''
        }
      });
    });
  }
  formularioCheckout() {
    this.forma = this.fb.group({
      // correo: [
      //   '',
      //   [Validators.required, Validators.pattern(this.emailValidaror)]
      // ],
      correo: { value: '', disabled: true },
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: this.fb.group({
        departamento: ['', Validators.required],
        municipio: ['', Validators.required],
        zona: ['', Validators.required],
        ubicacion: ['', Validators.required],
        referencia: ['']
      }),
      fechaEntreaga: ['', Validators.required]
    });
  }

  validarCampo(nombre: string) {
    return this.forma.get(nombre).invalid && this.forma.get(nombre).touched;
  }
  // <=================================================================> //

  // <=================================================================> //
  // Formulario de envio
  // <=================================================================> //
  formularioPago() {
    this.formaPago = this.fb.group({
      tipoPago: ['', Validators.required],
      condiciones: [false, [Validators.required, Validators.pattern('true')]]
    });
  }
  // <=================================================================> //
  // Hacer pedido
  // <=================================================================> //
  hacerPedido() {
    //
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(resp => resp.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    if (this.formaPago.invalid) {
      return Object.values(this.formaPago.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(resp => resp.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    if (this.forma.valid) {
      const fechaCheacion = new Date();
      this.obtenerResultados();

      const checkoutData: Checkout = {
        correo: this.forma.value.correo,
        nombre: this.forma.value.nombre,
        telefono: this.forma.value.telefono,
        direccion: this.forma.value.direccion,
        totales: this.totales,
        productos: this.products,
        fechaCreacion: fechaCheacion.toString(),
        fechaEnvio: this.forma.value.fechaEntreaga,
        tipoPago: this.formaPago.value.tipoPago,
        condiciones: this.formaPago.value.condiciones
      };

      Swal.fire({
        title: 'Realizar pedido a:',
        // text: 'You won\'t be able to revert this!',
        html: `
        <div class="text-left">
        <strong>Nombre:</strong> ${checkoutData.nombre}<br>
        <strong>Correo:</strong> ${checkoutData.correo}<br>
        <strong>Teléfono:</strong> ${checkoutData.telefono}<br>
        <strong>Dirección:</strong> ${checkoutData.direccion.ubicacion} ${checkoutData.direccion.zona} 
        ${checkoutData.direccion.municipio} ${checkoutData.direccion.departamento}<br>
        <strong>Total:</strong> ${checkoutData.totales['total']}</div>`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Hacer pedido!',
        showCancelButton: true
      }).then(result => {
        if (result.value) {
          Swal.fire('Enviado!', 'Su pedido se a procesado', 'success');
        }
      });
      console.log(checkoutData);
    }
  }

  logout() {
    this.authService.logout();
  }
}

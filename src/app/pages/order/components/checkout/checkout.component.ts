import { Component, OnInit, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

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
  Zona,
} from '../../../../interfaces/checkout.interface';

import * as moment from 'moment';
import { MY_FORMATS } from '../../../../material/material.module';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  //

  usuario$: Observable<UsuarioModel>;
  userUid: string = '';

  public departamento = Object.keys(Departamento).map((key) => ({
    label: key,
    key: Departamento[key],
  }));

  public municipio = Object.keys(Municipio).map((key) => ({
    label: key,
    key: Municipio[key],
  }));

  public zona = Object.keys(Zona).map((key) => ({
    label: key,
    key: Zona[key],
  }));

  // para los productos
  products: CartInterface[];

  // variable de totales
  totales: any = {};
  subtotal: number = 0;
  delivery: number = 0;
  discount: number = 0;
  total: number = 0;

  // variable para el formulario
  forma: FormGroup;
  emailValidaror = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$';
  phoneValidator: string = `^((\\+91-?)|0)?[0-9]{8}$`;

  // forma para metodo de pago
  formaPago: FormGroup;

  // variables para fecha y hora de entrega
  date = new FormControl(moment());

  fechaEntregaInput: string = '';
  diaDeHoy = new Date().getDay();

  minDate: Date;
  maxDate: Date;
  //

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private cartService: CartService
  ) {
    this.formularioCheckout();
    this.formularioPago();
    this.initDataUser();
    this.fechasDeCalendario();
  }
  //

  ngOnInit() {}

  // <=================================================================> //
  //  obtener los resultados para subtotal, descuento y total //
  // <=================================================================> //
  obtenerResultados() {
    this.cartService.cart$
      .pipe(
        map((data) =>
          data.reduce((total, cart: CartInterface) => total + cart.total, 0)
        )
      )
      .subscribe((result) => {
        this.subtotal = result;
        this.delivery = result >= 100 ? 0 : 12;
        this.discount = 0;
        this.total = result > 0 ? result + this.delivery - this.discount : 0;
        // console.log(this.subtotal);

        this.totales = {
          subtotal: this.subtotal,
          delivery: this.delivery,
          discount: this.discount,
          total: this.total,
        };
      });
  }
  // <===============================================================> //

  // <===============================================================> //
  // obtener uid de usuario y datos del productos //
  // <===============================================================> //
  initDataUser() {
    this.cartService.cart$.subscribe((resp) => (this.products = resp));
    this.authService.getuser().subscribe((resp) => {
      this.userUid = resp.uid;
      this.obtenerUsuario(resp.uid);
    });
  }

  // <===============================================================> //
  // Obtener un usuario por uid de firebase y llenar el formulario
  // con sus datos //
  // <===============================================================> //
  obtenerUsuario(uid: string) {
    this.userService.getUserById(uid).subscribe((resp) => {
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
          referencia: '',
        },
      });
    });
  }
  // <===============================================================> //

  // <===============================================================> //
  // Creacion del formulario de checkout //
  // <===============================================================> //
  formularioCheckout() {
    this.forma = this.fb.group({
      correo: [
        '',
        [Validators.required, Validators.pattern(this.emailValidaror)],
      ],
      // correo: [{ value: 'Nancy', disabled: true }, Validators.required],
      nombre: ['', Validators.required],
      telefono: [
        '',
        [
          Validators.required,
          Validators.pattern(new RegExp('^[0-9]*$')),
          Validators.minLength(8),
          Validators.maxLength(8),
        ],
      ],
      direccion: this.fb.group({
        departamento: ['', Validators.required],
        municipio: ['', Validators.required],
        zona: ['', Validators.required],
        ubicacion: ['', Validators.required],
        referencia: [''],
      }),
      fechaEntreaga: ['', Validators.required],
      hora: [],
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
      condiciones: [false, [Validators.required, Validators.pattern('true')]],
    });
  }
  // <=================================================================> //

  // <=================================================================> //
  // enviar la orden a firebase
  // <=================================================================> //
  hacerPedido() {
    // si la forma de checkout es valida
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(
            (resp) => resp.markAsTouched(),
            Swal.fire('Llene campos obligatorios')
          );
        } else {
          control.markAsTouched();
          Swal.fire('Llene campos obligatorios');
        }
      });
    }

    // si la forma de pago es valida
    if (this.formaPago.invalid) {
      return Object.values(this.formaPago.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach((resp) =>
            resp.markAsTouched()
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    // <== si la forma de checkout es valida ==> //
    if (this.forma.valid) {
      // console.log(this.forma.value.dates);
      let dateEntrega: string = '';
      let formaPago: string = '';

      if (this.forma.value.fechaEntreaga === 'fecha entrega') {
        dateEntrega = `${this.fechaEntregaInput}, ${this.forma.value.hora}`;
      } else {
        dateEntrega = 'Lo mas pronto posible (de 3 a 4 horas)';
      }

      if (this.formaPago.value.tipoPago === 'credito-debito') {
        formaPago =
          'Tarjeta (Nuestro repartidor le cobrara en la entrega con un POS)';
      } else {
        formaPago = 'Efectivo';
      }

      const fechaCheacion = new Date();
      this.obtenerResultados();

      const checkoutData: Checkout = {
        $key: Date.now().toString(),
        correo: this.forma.value.correo,
        nombre: this.forma.value.nombre,
        telefono: this.forma.value.telefono,
        direccion: this.forma.value.direccion,
        totales: this.totales,
        productos: this.products,
        fechaCreacion: fechaCheacion.toString(),
        fechaEntrega: dateEntrega,
        tipoPago: this.formaPago.value.tipoPago,
        condiciones: this.formaPago.value.condiciones,
        status: 'processed',
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
        <strong>Entrega:</strong> ${dateEntrega}<br>
        <strong>Pago:</strong> ${formaPago}<br>
        <strong>Total:</strong> Q${checkoutData.totales['total']}</div>`,
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, Hacer pedido!',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {
          this.userService.sendOrder(this.userUid, checkoutData);
        }
      });
      // console.log(checkoutData);
    }
  }

  logout() {
    this.authService.logout();
  }

  // <=================================================================> //
  // obtener el cambio de fecha en datepicker
  // <=================================================================> //
  cambioFecha(event: any): string {
    const data = event;
    console.log(data);
    const formattedDate =
      data['_i']['date'] +
      '-' +
      (data['_i']['month'] + 1) +
      '-' +
      data['_i']['year'];
    // console.log(formattedDate);
    this.fechaEntregaInput = formattedDate;
    return formattedDate;
  }

  // <=================================================================> //
  // maximo y minio de fechas de entrega para datepicker
  // <=================================================================> //
  fechasDeCalendario() {
    const todayDate = new Date();
    this.minDate = new Date(todayDate.setDate(todayDate.getDate() + 1));
    this.maxDate = new Date(todayDate.setDate(todayDate.getDate() + 20));
  }
}

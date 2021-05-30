import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';
import { Checkout } from '../../../../interfaces/checkout.interface';
import { CartInterface } from '../../../../interfaces/cart.interface';
import { CartService } from '../../../../services/cart.service';
import Swal from 'sweetalert2';
import {
  Departamento,
  Municipio,
  Zona,
} from '../../../../interfaces/checkout.interface';

import { CuponService } from '../../../../services/cupon.service';
import { SettingsService } from '../../../../services/settings.service';
import { TotalService } from 'src/app/services/total.service';
import { Totals } from 'src/app/interfaces/totals.interface';
import { __importDefault } from 'tslib';
import * as moment from 'moment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  //

  prontoPosible: boolean = false;
  finDeSemana: boolean = false;
  diasAumento: number = 1;
  horasAumento: string = '10:00 am';
  userUid: string = '';
  userEmail = '';

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

  municipioInit: string;
  zonaInit: string;

  // para los productos
  products: CartInterface[];

  // variable de totales
  totales: Totals;

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
    private cartService: CartService,
    private settings: SettingsService,
    private totalService: TotalService
  ) {
    this.getSettings();
    this.formularioCheckout();
    this.formularioPago();
    this.initDataUser();
  }
  //

  ngOnInit() {}

  // <=================================================================> //
  //  obtener setting  //
  // <=================================================================> //
  private getSettings() {
    this.settings.getProntoPosible().subscribe((resp: any) => {
      let horas: string = '';
      if (resp.dias_aumento >= 2) {
        horas = '10:00 am';
      } else {
        horas = resp.horas_no_disponibles;
      }

      this.prontoPosible = resp.estado;
      this.finDeSemana = resp.fin_de_semana;
      this.diasAumento = resp.dias_aumento;
      this.horasAumento = horas;

      this.fechasDeCalendario();
    });
  }

  // <===============================================================> //
  // obtener uid de usuario y datos del productos //
  // <===============================================================> //
  initDataUser() {
    this.cartService.cart$.subscribe((resp) => (this.products = resp));
    this.authService.getuser().subscribe((resp) => {
      this.userUid = resp.uid;
      this.userEmail = resp.email;
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
        nombre:
          resp['nombreRecibe'] != null ? resp['nombreRecibe'] : resp.nombre,
        telefono: resp.telefono,
        direccion: {
          departamento: Departamento.Quetzaltenango,
          municipio:
            resp['municipio'] != null
              ? resp['municipio']
              : Municipio.Quetzaltenango,
          zona: resp['zona'] != null ? resp['zona'] : Zona.Zona1,
          ubicacion: resp['direccion'] != null ? resp['direccion'] : '',
          referencia: resp['referencia'] != null ? resp['referencia'] : '',
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
      banco: ['Banrural', Validators.required],
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

    if (
      this.forma.value.fechaEntreaga === 'fecha entrega' &&
      this.fechaEntregaInput === ''
    ) {
      Swal.fire('ingrese una fecha');
      return;
    }

    if (
      this.forma.value.fechaEntreaga === 'fecha entrega' &&
      this.forma.value.hora === null
    ) {
      Swal.fire('ingrese una hora');
      return;
    }

    // <== si la forma de checkout es valida ==> //
    if (this.forma.valid) {
      let dateEntrega: string = '';
      let formaPago: string = '';

      if (this.forma.value.fechaEntreaga === 'fecha entrega') {
        dateEntrega = `${this.fechaEntregaInput}, ${this.forma.value.hora}`;
      } else if (this.finDeSemana) {
        dateEntrega = 'Programado para entregar el día lunes';
      } else {
        dateEntrega = 'Lo más pronto posible (de 3 a 4 horas)';
      }

      if (this.formaPago.value.tipoPago === 'credito-debito') {
        formaPago =
          'Tarjeta (Nuestro repartidor le cobrara en la entrega con un POS)';
      } else if (this.formaPago.value.tipoPago === 'transferencia') {
        formaPago =
        `Transferencia bancaria - ${this.formaPago.value.banco}`;
      } else {
        formaPago = 'Efectivo';
      }

      const fechaCheacion = new Date();

      // this.obtenerResultados();
      this.totalService.totals$.subscribe((resp) => {
        this.totales = resp;
      });

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
        tipoPago: formaPago,
        condiciones: this.formaPago.value.condiciones,
        status: 'processed',
        userUid: this.userUid,
        codeDiscount: this.totales.cuponCode,
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
          this.userService.sendOrder(this.userUid, checkoutData); // <=== Envia orden de usuario
          this.safeUserData(); // <=== actualiza datos de usuario
          /* si hay cupon */
          if (checkoutData.codeDiscount !== '') {
            this.safeCuponInuser({
              aplicado: true,
              id: this.totales.cuponCode,
            });
          }
        }
      });
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
    const formattedDate =
      data['_i']['date'] +
      '-' +
      (data['_i']['month'] + 1) +
      '-' +
      data['_i']['year'];
    this.fechaEntregaInput = formattedDate;
    return formattedDate;
  }

  // <=================================================================> //
  // maximo y minio de fechas de entrega para datepicker
  // <=================================================================> //
  fechasDeCalendario() {
    const todayDate = new Date();
    this.minDate = new Date(
      todayDate.setDate(todayDate.getDate() + this.diasAumento)
    );
    this.maxDate = new Date(todayDate.setDate(todayDate.getDate() + 20));
  }

  /* <========================================================> */
  /* <================ Guardar datos del Usuario =============> */
  /* <========================================================> */
  safeUserData() {
    const dataUser: object = {
      nombreRecibe: this.forma.value.nombre,
      telefono: this.forma.value.telefono,
      ciudad: this.forma.value.direccion.departamento,
      municipio: this.forma.value.direccion.municipio,
      zona: this.forma.value.direccion.zona,
      direccion: this.forma.value.direccion.ubicacion,
      referencia: this.forma.value.direccion.referencia,
      uid: this.userUid,
    };

    this.userService.updateUser(this.userUid, dataUser).then((resp) => {});
  }
  /* <========================================================> */

  /* <========================================================> */
  /* <================ Guardar cupon en usuario =============> */
  /* <========================================================> */
  safeCuponInuser(data: object) {
    this.userService.createCuponInUser(this.userUid, data);
  }
  /* <========================================================> */
}

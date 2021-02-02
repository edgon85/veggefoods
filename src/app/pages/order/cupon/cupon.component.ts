import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CartInterface } from 'src/app/interfaces/cart.interface';
import { Totals } from 'src/app/interfaces/totals.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CuponService } from 'src/app/services/cupon.service';
import { TotalService } from 'src/app/services/total.service';

@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.component.html',
  styleUrls: ['./cupon.component.scss'],
})
export class CuponComponent implements OnInit {
  inputCupon: boolean = false;
  userUid: string;

  formDescuento: FormGroup;
  cuponValido: boolean = false;
  cuponUsado: boolean = false;
  valorCupon: number = 0.0;
  cuponErroText: string = '';
  codeCupon: string = '';

  // variable de totales
  totales: Totals;

  //
  @ViewChild('myCupon', { static: true }) myCupon: ElementRef;

  input$: Observable<KeyboardEvent>;

  constructor(
    private fb: FormBuilder,
    private cuponService: CuponService,
    private authService: AuthService,
    private cartService: CartService,
    private totalService: TotalService
  ) {
    this.formDescuento = this.fb.group({
      cupon: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.authService.getuser().subscribe((resp) => (this.userUid = resp.uid));
    this.inicializarResultados();
  }

  /* <=================================================> */
  /* <== Muesta el input para el codigo del cupon =====> */
  /* <=================================================> */
  showInputCupon() {
    this.inputCupon = true;
  }
  /* <=================================================> */

  /* <===================================> */
  /* <======== Aplica el cupon ==========> */
  /* <===================================> */
  readCupon() {
    if (this.formDescuento.invalid) {
      this.cuponErroText = 'Introduzca código de descuento';
      setTimeout(() => {
        this.cuponErroText = '';
      }, 3000);
      return;
    }

    // console.log(this.userUid);
    const codigo = this.formDescuento.value.cupon.toLowerCase();
    // console.log(`Cupon: ${codigo}`)
    this.codeCupon = codigo;
    this.validateCupon(codigo);

    // this.obtenerResultados();
  }
  /* <===================================> */

  /* <=================================================================> */
  /* <==== Validar cupon  ====> */
  /* <=================================================================> */
  validateCupon(cuponCode: string) {
    this.cuponService
      .getCupon(cuponCode)
      .pipe(
        take(1),
        map((data: string) => {
          if (data !== undefined) {
            this.cuponValido = true;
            this.valorCupon = parseFloat(data['valor']);
          } else {
            this.valorCupon = 0;
            this.cuponValido = false;
            // console.log('Cupon no valido');
          }

          return this.cuponValido;
        })
      )
      .subscribe((resp) => {
        if (resp) {
          this.validateUserCupon(cuponCode);
        } else {
          this.cuponErroText = 'Cupón no valido';

          setTimeout(() => {
            this.cuponErroText = '';
          }, 3000);
          return;
        }
      });
  }
  /* <=================================================================> */

  /* <=================================================================> */
  /* <==== Validar cupon en el usuario ====> */
  /* <=================================================================> */
  validateUserCupon(cuponCode: string) {
    this.cuponService
      .getCuponUser(this.userUid, cuponCode)
      .pipe(
        take(1),
        map((data: string) => {
          if (data != null) {
            this.cuponUsado = true;
          } else {
            this.cuponUsado = false;
          }
          return this.cuponUsado;
        })
      )
      .subscribe((resp) => {
        if (!resp) {
          this.obtenerResultados(this.valorCupon, this.codeCupon);
        } else {
          this.cuponErroText = 'Cupón ya fue usado';
          setTimeout(() => {
            this.cuponErroText = '';
          }, 3000);
          return;
        }
      });
  }
  /* <=================================================================> */

  /* <=================================================================> */
  /* <==== Incializar resultados ====> */
  /* <=================================================================> */
  inicializarResultados() {
    this.cartService.cart$
      .pipe(
        map((data) => {
          return data.reduce(
            (total, cart: CartInterface) => total + cart.total,
            0
          );
        })
      )
      .subscribe((result) => {
        let subtotal = result;
        let discount = 0;
        this.totalService.updateTotals(subtotal, discount, '');
        this.totalService.totals$.subscribe((resp) => (this.totales = resp));
      });
  }
  /* <=================================================================> */

  /* <=================================================================> */
  /* <==== obtener los resultados para subtotal, descuento y total ====> */
  /* <=================================================================> */
  obtenerResultados(discountValue: number, codeCupon: string) {
    this.cartService.cart$
      .pipe(
        map((data) => {
          return data.reduce(
            (total, cart: CartInterface) => total + cart.total,
            0
          );
        })
      )
      .subscribe((result) => {
        let subtotal = result;
        let discount = discountValue;

        if (subtotal <= 100) {
          this.cuponErroText =
            'Para validar el cupón su compra debe ser mayor a Q100';
          setTimeout(() => {
            this.cuponErroText = '';
          }, 5000);
        } else if (subtotal <= discountValue) {
          this.cuponErroText =
            'El total tiene que ser mayor al valor del cupón';
          setTimeout(() => {
            this.cuponErroText = '';
          }, 5000);
        } else {
          this.totalService.updateTotals(subtotal, discount, codeCupon);
          this.totalService.totals$.subscribe((resp) => {
            this.cuponErroText = '';
            this.totales = resp;
          });
        }
      });
  }
  // <===============================================================> //

  validarCampo(nombre: string) {
    return (
      this.formDescuento.get(nombre).invalid &&
      this.formDescuento.get(nombre).touched
    );
    // return this.formDescuento.get(nombre).invalid;
  }
}

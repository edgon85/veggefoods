import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CartInterface } from 'src/app/interfaces/cart.interface';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CuponService } from 'src/app/services/cupon.service';

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

  // variable de totales
  totales: any = {};
  subtotal: number = 0;
  delivery: number = 0;
  discount: number = 0;
  total: number = 0;

  constructor(
    private fb: FormBuilder,
    private cuponService: CuponService,
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.formDescuento = this.fb.group({
      cupon: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.authService.getuser().subscribe((resp) => (this.userUid = resp.uid));
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
    /* if (this.formDescuento.invalid) {
      return;
    }

    // console.log(this.userUid);
    const codigo = this.formDescuento.value.cupon.toLowerCase();
    // console.log(`Cupon: ${codigo}`)
    this.validateCupon(codigo); */
    this.obtenerResultados();
  }
  /* <===================================> */

  validateCupon(cuponCode: string) {
    this.cuponService
      .getCupon(cuponCode)
      .pipe(
        take(1),
        map((data: string) => {
          if (data !== undefined) {
            this.cuponValido = true;
            // console.log('Cupon valido');
          } else {
            this.cuponValido = false;
            // console.log('Cupon no valido');
          }

          return this.cuponValido;
        })
      )
      .subscribe((resp) => {
        console.log(`Cupon valido ${resp}`);
        if (resp) {
          this.validateUserCupon(cuponCode);
        } else {
          return;
        }
      });
  }

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
      .subscribe((resp) => console.log(`cupon usado ${resp}`));
  }

  /* <=================================================================> */
  /* <==== obtener los resultados para subtotal, descuento y total ====> */
  /* <=================================================================> */
  obtenerResultados() {
    this.cartService.cart$
      .pipe(
        map((data) => {
          console.log(data);
          return data.reduce(
            (total, cart: CartInterface) => total + cart.total,
            0
          );
        })
      )
      .subscribe((result) => {

        console.log(result);
        this.subtotal = result;
        this.delivery = result >= 100 ? 0 : 12;
        this.discount = 0;
        this.total = result > 0 ? result + this.delivery - this.discount : 0;

        this.totales = {
          subtotal: this.subtotal,
          delivery: this.delivery,
          discount: this.discount,
          total: this.total,
        };
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

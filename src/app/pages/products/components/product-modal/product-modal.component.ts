import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
// import { mergeAll, pluck } from 'rxjs/operators';
import { CartInterface } from 'src/app/interfaces/cart.interface';
import { ProductoModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductModalService } from 'src/app/services/product-modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  cantidadProductDetail: number = 1;

  /* ---------------- */
  nivelMadurez = [
    {medio: ''},
    {}
  ]

  forma: FormGroup;

  isComentario:boolean;

  constructor(
    public modalProducService: ProductModalService,
    private cartService: CartService,
    private fb: FormBuilder,
    private router: Router   
  ) {
    this.formularioEspecificacionesProducto();
    console.log(modalProducService.product);
  }

  ngOnInit() {
    this.isComentario = this.forma.value.checkComentario;
    this.forma.reset({
      madurez: 'Normal (3 a 5 días)'
    });
  }

  // <===============================================================> //
  // Creacion del formulario para especificaciones de producto //
  // <===============================================================> //

    formularioEspecificacionesProducto(){
      this.forma = this.fb.group({
        madurez: [''],
        especificacion: [''],
        isComentarioChecked: [false]
      });
    }

  // <===============================================================> //

  closeModal(){
    this.forma.reset({
      madurez: 'Normal (3 a 5 días)',
      especificacion: '',
      isComentarioChecked: false
    })
    this.isComentario = false;
    this.cantidadProductDetail = 1;
    this.modalProducService.closeModal();
  }

  addToCart(producto: ProductoModel) {

    let myadurez: string  = '';
    (producto.opciones.madurez) ? myadurez =  this.forma.value.madurez : myadurez;

    const product: ProductoModel = {
      _id: producto._id,
      categoria: producto.categoria,
      descuento: producto.descuento,
      destacado: producto.destacado,
      detalle: producto.detalle,
      imagen: producto.imagen,
      masa: producto.masa,
      nombre: producto.nombre,
      precio: producto.precio,
      comentaio: this.forma.value.especificacion,
      madurez: myadurez
    }

    const cartItem: CartInterface = {
      cartItemId: product._id,
      quantity: this.cantidadProductDetail,
      total: this.cantidadProductDetail * product.precio,
      product: product,
    }
      


    this.cartService.addToCart(cartItem);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `Se agregó ${producto.nombre} al carrito`,
      showConfirmButton: false,
      timer: 2500,
    });
    console.log(cartItem);

    this.closeModal();
  }

  changeTexboxValue(f:any){
    this.isComentario = f.currentTarget.checked;
  }


  verCarrito(){
    this.router.navigateByUrl('/cart');
    this.closeModal();
  }
}

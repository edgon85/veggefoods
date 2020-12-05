import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductModalService } from 'src/app/services/product-modal.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {

  nivelMadurez = [
    {medio: ''},
    {}
  ]

  forma: FormGroup;

  isComentario:boolean;

  constructor(
    public modalProducService: ProductModalService,
    private fb: FormBuilder   
  ) {
    this.formularioEspecificacionesProducto();
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
        especificacion: ['']
      });
    }

  // <===============================================================> //

  closeModal(){
    this.forma.reset({
      madurez: 'Normal (3 a 5 días)',
      especificacion: ''
    })
    this.modalProducService.closeModal();
  }

  addToCart(producto: any){
    console.log(producto);
    console.log(this.forma.value.madurez);
    console.log(this.forma.value.especificacion);
    console.log(this.forma.value.checkComentario);
  }

  changeTexboxValue(f:any){
    this.isComentario = f.currentTarget.checked;
  }
}

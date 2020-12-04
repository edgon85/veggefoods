import { Injectable } from '@angular/core';
import { ProductoModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductModalService {

  public product: ProductoModel;

  private _ocultarModal: boolean = true;

  get ocultarModal(){
    return this._ocultarModal;
  };


  abrirModal(producto: ProductoModel){
    this.product = producto
    // console.log(this.product);
    this._ocultarModal = false;
  }


  closeModal(){
    this._ocultarModal = true;
  }

  constructor() { }
}

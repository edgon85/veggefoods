import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Totals } from '../interfaces/totals.interface';

@Injectable({
  providedIn: 'root'
})
export class TotalService {

  private totalItem: Totals = {
    subtotal: 0,
    delivery: 0,
    discount: 0,
    total: 0,
    cuponCode: ''
  } 

  subtotal: number = 0;
  delivery: number = 0;
  discount: number = 0;
  total: number = 0;


  private totals = new BehaviorSubject<Totals>(this.totalItem);
  totals$ = this.totals.asObservable(); 

  constructor() { }


  updateTotals(subTotal: number, discount: number, codeCupon: string){

    this.subtotal = subTotal;
    this.delivery = subTotal >= 100 ? 0 : 12;
    this.discount = discount;
    this.total = subTotal > 0 ? subTotal + this.delivery - this.discount : 0;

    this.totalItem = {
      subtotal: this.subtotal,
      delivery: this.delivery,
      discount: this.discount,
      total: this.total,
      cuponCode: codeCupon
    }

    this.totals.next(this.totalItem);
  }

}

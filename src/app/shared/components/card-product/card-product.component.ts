import { Component, OnInit, Input } from '@angular/core';
import { ProductoModel } from '../../../models/product.model';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input() producto: ProductoModel;

  constructor() {}

  ngOnInit() {}
}

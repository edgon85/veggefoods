import { Component, OnInit, Input } from '@angular/core';
import { ProductoModel } from '../../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.scss']
})
export class CardProductComponent implements OnInit {
  @Input() producto: ProductoModel;

  constructor(private router: Router) {}

  ngOnInit() {}

  getProduct(productId: string, categoryPrd: string) {
    localStorage.setItem('redirectProd', `/productos/categoria/${categoryPrd}`);
    this.router.navigate(['/producto', productId]);
  }
}

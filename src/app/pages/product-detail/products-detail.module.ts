import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { ProductsDetailRoutingModule } from './products-detail.routing';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  declarations: [ProductDetailComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProductsDetailRoutingModule,
    FormsModule
  ]
})
export class ProductsDetailModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from './products.routing';

@NgModule({
  declarations: [ProductComponent, ProductDetailComponent],
  imports: [CommonModule, SharedModule, ProductsRoutingModule]
})
export class ProductsModule {}

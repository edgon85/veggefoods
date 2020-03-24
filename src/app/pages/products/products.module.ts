import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from './products.routing';
import { ProductPageComponent } from './components/product-page/product-page.component';

@NgModule({
  declarations: [ProductComponent, ProductPageComponent],
  imports: [CommonModule, SharedModule, ProductsRoutingModule]
})
export class ProductsModule {}

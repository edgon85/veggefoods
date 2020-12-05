import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductComponent } from './components/product/product.component';
import { SharedModule } from '../../shared/shared.module';
import { ProductsRoutingModule } from './products.routing';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';
import { DomeseguroProductdetailPipe } from 'src/app/pipes/domeseguro-productdetail.pipe';

@NgModule({
  declarations: [
    ProductComponent,
    ProductPageComponent,
    ProductModalComponent,
    DomeseguroProductdetailPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}

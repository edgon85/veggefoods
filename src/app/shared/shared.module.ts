import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CardProductComponent,
    LoadingComponent
  ],
  imports: [CommonModule],
  exports: [
    FooterComponent,
    HeaderComponent,
    CardProductComponent,
    LoadingComponent
  ]
})
export class SharedModule {}

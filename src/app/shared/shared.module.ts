import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { FormsModule } from '@angular/forms';
import { HeaderProductComponent } from './components/header-product/header-product.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CardProductComponent,
    LoadingComponent,
    SidebarComponent,
    IncrementadorComponent,
    HeaderProductComponent
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    FooterComponent,
    HeaderComponent,
    CardProductComponent,
    LoadingComponent,
    SidebarComponent,
    IncrementadorComponent,
    HeaderProductComponent
  ]
})
export class SharedModule {}

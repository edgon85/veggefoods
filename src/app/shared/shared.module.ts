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
import { TotalCartDetailComponent } from './components/total-cart-detail/total-cart-detail.component';
import { SidebarAccountComponent } from './components/sidebar-account/sidebar-account.component';
import { ReplacePipe } from '../pipes/replace.pipe';
import { CurrecyFormatPipe } from '../pipes/currecy-format.pipe';
import { NoImagePipe } from '../pipes/no-image.pipe';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    CardProductComponent,
    LoadingComponent,
    SidebarComponent,
    IncrementadorComponent,
    HeaderProductComponent,
    TotalCartDetailComponent,
    SidebarAccountComponent,
    ReplacePipe,
    CurrecyFormatPipe,
    NoImagePipe,
    OrderTrackingComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [
    FooterComponent,
    HeaderComponent,
    CardProductComponent,
    LoadingComponent,
    SidebarComponent,
    IncrementadorComponent,
    HeaderProductComponent,
    TotalCartDetailComponent,
    SidebarAccountComponent,
    ReplacePipe,
    CurrecyFormatPipe,
    NoImagePipe,
    OrderTrackingComponent,
  ],
})
export class SharedModule {}

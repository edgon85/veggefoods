import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderProductComponent } from './components/header-product/header-product.component';
import { TotalCartDetailComponent } from './components/total-cart-detail/total-cart-detail.component';
import { SidebarAccountComponent } from './components/sidebar-account/sidebar-account.component';
import { ReplacePipe } from '../pipes/replace.pipe';
import { CurrecyFormatPipe } from '../pipes/currecy-format.pipe';
import { NoImagePipe } from '../pipes/no-image.pipe';
import { OrderTrackingComponent } from './components/order-tracking/order-tracking.component';
import { WhatsappComponent } from './components/whatsapp/whatsapp.component';
import { ComoFuncionaComponent } from './components/como-funciona/como-funciona.component';
import { FloatingButtonComponent } from './components/floating-button/floating-button.component';
import { RemoveDashPipe } from '../pipes/remove-dash.pipe';
import { DomeseguroProductdetailPipe } from '../pipes/domeseguro-productdetail.pipe';
import { CapitalizadoPipe } from '../pipes/capitalizado.pipe';
import { CuponComponent } from '../pages/order/components/cupon/cupon.component';

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
    WhatsappComponent,
    ComoFuncionaComponent,
    FloatingButtonComponent,
    RemoveDashPipe,
    DomeseguroProductdetailPipe,
    CapitalizadoPipe,
    // CuponComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
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
    WhatsappComponent,
    ComoFuncionaComponent,
    FloatingButtonComponent,
    DomeseguroProductdetailPipe,
    CapitalizadoPipe
  ],
})
export class SharedModule {}

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';
import { RepeatNumberPipe } from '../../pipes/cart/repeat-number.pipe';
import { DeleteRepeatPipe } from '../../pipes/cart/delete-repeat.pipe';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MaterialModule } from '../../material/material.module';
import { DisableControlDirective } from '../../directives/disable-control.directive';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    OrderComponent,
    DeleteRepeatPipe,
    RepeatNumberPipe,
    CheckoutComponent,
    // DisableControlDirective,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
  ],
})
export class OrderModule {}

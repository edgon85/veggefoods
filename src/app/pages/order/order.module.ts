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
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CuponComponent } from './cupon/cupon.component';

@NgModule({
  declarations: [
    OrderComponent,
    DeleteRepeatPipe,
    RepeatNumberPipe,
    CheckoutComponent,
    CuponComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
  ]
})
export class OrderModule {}

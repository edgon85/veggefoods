import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order/order.component';
import { RepeatNumberPipe } from '../../pipes/cart/repeat-number.pipe';
import { DeleteRepeatPipe } from '../../pipes/cart/delete-repeat.pipe';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [OrderComponent, DeleteRepeatPipe, RepeatNumberPipe],
  imports: [CommonModule, OrderRoutingModule, SharedModule]
})
export class OrderModule {}

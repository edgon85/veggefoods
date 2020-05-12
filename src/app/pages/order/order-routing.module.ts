import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './components/order/order.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthGuard } from '../../guards/auth.guard';
import { ChekoutGuard } from '../../guards/chekout.guard';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  },
  {
    path: 'checkout',
    // canActivate: [ChekoutGuard],
    component: CheckoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}

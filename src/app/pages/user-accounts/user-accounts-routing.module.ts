import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutAccountComponent } from './components/layout-account/layout-account.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutAccountComponent,
    children: [
      { path: 'perfil', component: PerfilComponent },
      { path: 'pedidos', component: OrderListComponent },
      { path: 'editar', component: EditUserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAccountsRoutingModule {}

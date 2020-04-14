import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAccountsRoutingModule } from './user-accounts-routing.module';
import { LayoutAccountComponent } from './components/layout-account/layout-account.component';
import { SharedModule } from '../../shared/shared.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { MaterialModule } from '../../material/material.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { FirstWordPipe } from '../../pipes/first-word.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutAccountComponent,
    PerfilComponent,
    OrderListComponent,
    EditUserComponent,
    FirstWordPipe,
  ],
  imports: [
    CommonModule,
    UserAccountsRoutingModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class UserAccountsModule {}

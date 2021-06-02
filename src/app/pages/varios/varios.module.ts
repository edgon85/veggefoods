import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VariosRoutingModule } from './varios-routing.module';
import { VariosComponent } from './components/varios/varios.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [VariosComponent],
  imports: [
    CommonModule,
    VariosRoutingModule,
    SharedModule
  ]
})
export class VariosModule { }

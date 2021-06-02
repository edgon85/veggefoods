import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarnesRoutingModule } from './carnes-routing.module';
import { CarneComponent } from './components/carne/carne.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [CarneComponent],
  imports: [
    CommonModule,
    CarnesRoutingModule,
    SharedModule
  ]
})
export class CarnesModule { }

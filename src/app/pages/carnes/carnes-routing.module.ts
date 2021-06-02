import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarneComponent } from './components/carne/carne.component';


const routes: Routes = [
  {
    path: '',
    component: CarneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarnesRoutingModule { }

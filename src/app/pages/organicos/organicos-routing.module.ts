import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganicosComponent } from './components/organicos/organicos.component';

const routes: Routes = [
  {
    path: '',
    component: OrganicosComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganicosRoutingModule {}

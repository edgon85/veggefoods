import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrganicDetailComponent } from './components/organic-detail/organic-detail.component';
import { OrganicosComponent } from './components/organicos/organicos.component';

const routes: Routes = [
  {
    path: '',
    component: OrganicosComponent,
  },
  {
    path: ':id',
    component : OrganicDetailComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganicosRoutingModule {}

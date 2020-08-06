import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { OrganicosComponent } from '../organicos/components/organicos/organicos.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProductPageComponent,
    children: [
      { path: 'frutas', component: ProductComponent },
      { path: 'verduras', component: ProductComponent },
      { path: 'especias', component: ProductComponent },
      { path: 'combos', component: ProductComponent },
      { path: 'semillas', component: ProductComponent },
      { path: 'regia', component: ProductComponent },
      { path: 'varios', component: ProductComponent },
      {
        path: 'orgánico',
        loadChildren: () =>
          import('../organicos/organicos.module').then(
            (m) => m.OrganicosModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}

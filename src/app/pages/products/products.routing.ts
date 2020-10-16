import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProductPageComponent,
    children: [
      { path: 'frutas', component: ProductComponent },
      { path: 'verduras', component: ProductComponent },
      { path: 'especias', component: ProductComponent },
      { path: 'combos', component: ProductComponent },
      { path: 'combo-fiambre', component: ProductComponent },
      { path: 'semillas', component: ProductComponent },
      {
        path: 'varios',
        loadChildren: () =>
          import('../varios/varios.module').then((m) => m.VariosModule),
      },
      {
        path: 'orgánicos',
        loadChildren: () =>
          import('../organicos/organicos.module').then(
            (m) => m.OrganicosModule
          ),
      },
      {
        path: 'carnes',
        loadChildren: () =>
          import('../carnes/carnes.module').then((m) => m.CarnesModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}

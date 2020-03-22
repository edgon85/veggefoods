import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import { ProductPageComponent } from './components/product-page/product-page.component';

const routes: Routes = [
  {
    path: ':id',
    component: ProductPageComponent,
    children: [
      {
        path: 'frutas',
        component: ProductComponent
      },
      { path: 'verduras', component: ProductComponent }
    ]
  }
  // {
  //   path: '',
  //   component: ProductComponent
  // },
  // {
  //   path: ':id',
  //   component: ProductDetailComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}

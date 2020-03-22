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
      { path: 'vegetales', component: ProductComponent },
      { path: 'semillas', component: ProductComponent },
      { path: 'chiles', component: ProductComponent },
      { path: 'aceites', component: ProductComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}

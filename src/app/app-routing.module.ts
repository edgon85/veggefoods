import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ContactModule } from './pages/contact/contact.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
          import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'productos',
        loadChildren: () =>
          import('./pages/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'producto',
        loadChildren: () =>
          import('./pages/product-detail/products-detail.module').then(
            m => m.ProductsDetailModule
          )
      },
      {
        path: 'contacto',
        loadChildren: () =>
          import('./pages/contact/contact.module').then(m => m.ContactModule)
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./pages/order/order.module').then(m => m.OrderModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      },
      { path: '', redirectTo: '/inicio', pathMatch: 'full' },
      {
        path: '**',
        loadChildren: () =>
          import('./pages/page-not-found/page-not-found.module').then(
            m => m.PageNotFoudModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

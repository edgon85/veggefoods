import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { PoliticasPrivacidadComponent } from './components/politicas-privacidad/politicas-privacidad.component';

const routes: Routes = [
  {
    path: 'terminos-y-condiciones',
    component: TerminosCondicionesComponent,
  },
  {
    path: 'proveedores',
    component: ProveedoresComponent,
  },
  {
    path: 'politicas-de-privacidad',
    component: PoliticasPrivacidadComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaRoutingModule {}

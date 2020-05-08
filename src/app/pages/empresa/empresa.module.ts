import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { TerminosCondicionesComponent } from './components/terminos-condiciones/terminos-condiciones.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { PoliticasPrivacidadComponent } from './components/politicas-privacidad/politicas-privacidad.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TerminosCondicionesComponent,
    ProveedoresComponent,
    PoliticasPrivacidadComponent,
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class EmpresaModule {}

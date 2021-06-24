import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BusquedaRoutingModule } from './busqueda-routing.module';
import { SearchComponent } from './search/search.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [SearchComponent],
  imports: [CommonModule, BusquedaRoutingModule, SharedModule],
})
export class BusquedaModule {}
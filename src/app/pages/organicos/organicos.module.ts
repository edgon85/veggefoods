import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganicosRoutingModule } from './organicos-routing.module';
import { OrganicosComponent } from './components/organicos/organicos.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [OrganicosComponent],
  imports: [CommonModule, OrganicosRoutingModule, SharedModule],
})
export class OrganicosModule {}

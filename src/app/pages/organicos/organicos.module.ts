import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganicosRoutingModule } from './organicos-routing.module';
import { OrganicosComponent } from './components/organicos/organicos.component';
import { SharedModule } from '../../shared/shared.module';
import { OrganicDetailComponent } from './components/organic-detail/organic-detail.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterModule } from '@angular/router';
import { FirstWordPipe } from 'src/app/pipes/first-word.pipe';

@NgModule({
  declarations: [OrganicosComponent, OrganicDetailComponent],
  imports: [CommonModule, OrganicosRoutingModule, SharedModule, RouterModule, ],
})
export class OrganicosModule {}

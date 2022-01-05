import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearMetaPage } from './crear-meta.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CrearMetaPageRoutingModule } from './crear-meta-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExploreContainerComponentModule,
    CrearMetaPageRoutingModule
  ],
  declarations: [CrearMetaPage]
})
export class CrearMetaPageModule {}

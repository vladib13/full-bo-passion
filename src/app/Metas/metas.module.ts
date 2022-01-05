import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MetasPage } from './metas.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { MetasPageRoutingModule } from './metas-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    MetasPageRoutingModule
  ],
  declarations: [MetasPage]
})
export class MetasPageModule {}

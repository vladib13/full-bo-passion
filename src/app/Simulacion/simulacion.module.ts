import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimulacionPage } from './simulacion.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { SimulacionPageRoutingModule } from './simulacion-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: SimulacionPage }]),
    SimulacionPageRoutingModule,
  ],
  declarations: [SimulacionPage]
})
export class SimulacionPageModule {}

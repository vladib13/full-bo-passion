import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationGuard } from '../guards/navigation.guard';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'metas',
        loadChildren: () => import('../Metas/metas.module').then(m => m.MetasPageModule),
        canActivate: [NavigationGuard]
      },
      {
        path: 'crear-meta',
        loadChildren: () => import('../Crear-Meta/crear-meta.module').then(m => m.CrearMetaPageModule)
      },
      {
        path: 'simulacion',
        loadChildren: () => import('../Simulacion/simulacion.module').then(m => m.SimulacionPageModule),
        canActivate: [NavigationGuard]
      },
      {
        path: '',
        redirectTo: '/tabs/metas',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/metas',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

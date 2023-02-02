import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibErrorComponent } from '../lib-error.component';
import { MDynamicCardComponent } from './generique/m-dynamic-card/m-dynamic-card.component';
import { LayoutComponent } from './layout/layout.component';
import { DCardComponent } from './unic/d-card/d-card.component';
import { MCardComponent } from './unic/m-card/m-card.component';
import { SCardContentComponent } from './unic/s-card-content/s-card-content.component';
import { SCardSIfnoComponent } from './unic/s-card-s-ifno/s-card-s-ifno.component';
import { STableCardComponent } from './unic/s-table-card/s-table-card.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'layout',
  },

  {
    path: 'layout',
    component: LayoutComponent,
    data: {},
  },
  {
    path: 'unic',
    children: [
      {
        path: 'carde-1',
        component: MCardComponent,
      },
      {
        path: 'carde-2',
        component: DCardComponent,
      },
      {
        path: 'carde-3',
        component: STableCardComponent,
      },
      {
        path: 'carde-4',
        component: SCardSIfnoComponent,
      },
      {
        path: 'carde-5',
        component: SCardContentComponent,
      },
    ],
  },

  {
    path: 'generique',
    children: [
      {
        path: 'm-dynamic-card',
        component: MDynamicCardComponent,
      },
    ],
  },

  {
    path: 'NotFoundInlib',
    component: LibErrorComponent,
    data: {},
  },
  {
    path: '**',
    pathMatch: 'full',
    component: LibErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardsRoutingModule { }

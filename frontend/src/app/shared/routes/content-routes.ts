import { Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { AuthGuard } from '../guards/auth.guard';
import { Page404Component } from 'src/app/shared/components/page404/page404.component';

export const content: Routes = [

  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      title: 'menu.dash',
      menu: true,
    },
    // canActivate: [AuthGuard],
  },

  {
    path: 'configuration',
    loadChildren: () =>
      import('../../components/configuration/configuration.module').then(
        (m) => m.ConfigurationModule
      ),
    data: {
      title: 'menu.configuration',
      type: 'module',
      menu: true,
    },
  },

  {
    path: 'PageNotFound',
    component: Page404Component,
    // canActivate: [AuthGuard],
    data: {
      title: '',
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    component: Page404Component,
  },
];

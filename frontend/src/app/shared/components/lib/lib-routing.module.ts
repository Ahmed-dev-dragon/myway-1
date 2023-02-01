import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibErrorComponent } from './lib-error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },

  // {
  //   path: 'configuration',
  //   loadChildren: () =>
  //     import('').then(
  //       (m) => m.ConfigurationModule
  //     ),
  //   data: {
  //     title: 'menu.configuration',
  //     type: 'module',
  //     menu: true,
  //   },
  // },

  {
    path: 'NotFoundInlib',
    component: LibErrorComponent,

    data: {
      title: '',
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    component: LibErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibRouteModule {}

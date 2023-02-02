import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibErrorComponent } from './lib-error.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cards',
  },
  {
    path: 'cards',
    loadChildren: () =>
      import('./cards/cards.module').then((m) => m.CardsModule),
    data: {},
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.module').then((m) => m.TablesModule),
    data: {},
  },
  {
    path: 'calendars',
    loadChildren: () =>
      import('./calendars/calendar.module').then((m) => m.SCalendarModule),
    data: {},
  },
  {
    path: 'chates',
    loadChildren: () =>
      import('./chates/chates.module').then((m) => m.ChatesModule),
    data: {},
  },
  {
    path: 'templates',
    loadChildren: () =>
      import('./templates/templates.module').then((m) => m.TemplatesModule),
    data: {},
  },
  {
    path: 'others',
      loadChildren: () =>
      import('./others/other.module').then((m) => m.OtherModule),
      data: {},
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./forms/form.module').then((m) => m.SFormModule),
    data: {},
  },
  {
    path: 'containers',
    loadChildren: () =>
      import('./containers/containers.module').then((m) => m.ContainersModule),
    data: {},
  },
  {
    path: 'sections',
    loadChildren: () =>
      import('./sections/sections.module').then((m) => m.SectionsModule),
    data: {},
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
  exports: [RouterModule],
})
export class LibRouteModule {}

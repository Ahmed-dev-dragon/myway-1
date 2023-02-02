import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibErrorComponent } from '../lib-error.component';
import { CDinamicCalComponent } from './c-dinamic-cal/c-dinamic-cal.component';
import { DinamicColComponent } from './dinamic-col/dinamic-col.component';
import { LayoutComponent } from './layout/layout.component';

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
    path: 'section-1',
    component: CDinamicCalComponent,
    data: {},
  },
  {
    path: 'section-2',
    component: DinamicColComponent,
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
  exports: [RouterModule]
})
export class SectionsRoutingModule { }

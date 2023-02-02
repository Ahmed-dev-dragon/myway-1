import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibErrorComponent } from '../lib-error.component';
import { LayoutComponent } from './layout/layout.component';
import { SDynamicTableComponent } from './s-dynamic-table/s-dynamic-table.component';

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
    path: 'ng-table-v2',
    component: SDynamicTableComponent,
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
export class TablesRoutingModule {






}

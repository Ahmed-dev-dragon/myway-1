import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LibErrorComponent } from '../lib-error.component';
import { AccordionComponent } from './accordion/accordion.component';
import { ConfigeUiComponent } from './confige-ui/confige-ui.component';
import { LayoutComponent } from './layout/layout.component';
import { MapComponent } from './map/map.component';
import { TimeLineComponent } from './time-line/time-line.component';

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
    path: 'map',
    component: MapComponent,
    data: {},
  },
  {
    path: 'confige-ui',
    component: ConfigeUiComponent,
    data: {},
  },
  {
    path: 'accordion',
    component: AccordionComponent,
    data: {},
  },
  {
    path: 'time-line',
    component: TimeLineComponent,
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
export class OtherRoutingModule { }

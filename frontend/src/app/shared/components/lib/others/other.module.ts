
import { ContainersModule } from './../containers/containers.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherRoutingModule } from './other-routing.module';
import { TimeLineComponent } from './time-line/time-line.component';
import { MapComponent } from './map/map.component';
import { ConfigeUiComponent } from './confige-ui/confige-ui.component';
import { AccordionComponent } from './accordion/accordion.component';
import { TimelineModule } from 'primeng/timeline';
import { LayoutComponent } from './layout/layout.component';
import { SFormModule } from '../forms/form.module';


@NgModule({
  declarations: [
    TimeLineComponent,
    MapComponent,
    ConfigeUiComponent,
    AccordionComponent,
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    OtherRoutingModule,
    TimelineModule,

    // ContainersModule,
    // SFormModule,
  ],
  exports: [
    TimeLineComponent,
    MapComponent,
    ConfigeUiComponent,
    AccordionComponent,
    LayoutComponent,
  ],
})
export class OtherModule {}

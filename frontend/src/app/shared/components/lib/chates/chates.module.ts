import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatesRoutingModule } from './chates-routing.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ChatesRoutingModule
  ]
})
export class ChatesModule { }

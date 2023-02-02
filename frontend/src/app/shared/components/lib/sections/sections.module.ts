import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SectionsRoutingModule } from './sections-routing.module';
import { DinamicColComponent } from './dinamic-col/dinamic-col.component';
import { CDinamicCalComponent } from './c-dinamic-cal/c-dinamic-cal.component';
import { ContainersModule } from '../containers/containers.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations:  [DinamicColComponent, CDinamicCalComponent, LayoutComponent],
  imports:       [CommonModule, SectionsRoutingModule, ContainersModule],
  exports:       [DinamicColComponent, CDinamicCalComponent, LayoutComponent],
})
export class SectionsModule {}

import { SharedModule } from './../../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { SDynamicTableComponent } from './s-dynamic-table/s-dynamic-table.component';
import { LayoutComponent } from './layout/layout.component';



@NgModule({
  declarations: [SDynamicTableComponent, LayoutComponent],
  imports: [CommonModule, TablesRoutingModule],
  exports: [SDynamicTableComponent, LayoutComponent],
})
export class TablesModule {}

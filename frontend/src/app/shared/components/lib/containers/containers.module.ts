import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContainersRoutingModule } from './containers-routing.module';
import { TableContianerComponent } from './table-contianer/table-contianer.component';
import { GridContianerComponent } from './grid-contianer.component';
import { ScectionContainersComponent } from './scection-container.component';
import { CardContianerComponent } from './card-contianer.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [
    TableContianerComponent,
    GridContianerComponent,
    ScectionContainersComponent,
    CardContianerComponent,
    LayoutComponent,
  ],
  imports: [
    TableContianerComponent,
    GridContianerComponent,
    ScectionContainersComponent,
    CardContianerComponent,
    LayoutComponent,
  ],
  exports: [GridContianerComponent],
})
export class ContainersModule {}

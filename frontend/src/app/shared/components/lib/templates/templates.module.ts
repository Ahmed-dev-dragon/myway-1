import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, TemplatesRoutingModule],
  exports: [LayoutComponent],
})
export class TemplatesModule {}

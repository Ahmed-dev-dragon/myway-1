import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { DommyFormComponent } from './dommy-form/dommy-form.component';
import { LayoutComponent } from './layout/layout.component';


@NgModule({
  declarations: [DommyFormComponent, LayoutComponent],
  imports: [CommonModule, FormRoutingModule],
  exports: [DommyFormComponent, LayoutComponent],
})
export class SFormModule {}

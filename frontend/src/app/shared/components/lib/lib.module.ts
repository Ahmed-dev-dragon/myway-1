import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { ConfigeUiComponent } from './confige-ui/confige-ui.component';


@NgModule({
  declarations: [AccordionComponent, ConfigeUiComponent],
  imports: [CommonModule],
  exports: [AccordionComponent, ConfigeUiComponent],
})
export class LibModule {}

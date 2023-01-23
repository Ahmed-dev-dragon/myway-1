import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { ConfigeUiComponent } from './confige-ui/confige-ui.component';
import { SCardSIfnoComponent } from './s-card-s-ifno/s-card-s-ifno.component';


@NgModule({
  declarations: [AccordionComponent, ConfigeUiComponent, SCardSIfnoComponent],
  imports: [CommonModule],
  exports: [AccordionComponent, ConfigeUiComponent, SCardSIfnoComponent],
})
export class LibModule {}

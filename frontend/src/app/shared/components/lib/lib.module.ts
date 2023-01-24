import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { ConfigeUiComponent } from './confige-ui/confige-ui.component';
import { SCardSIfnoComponent } from './cards/s-card-s-ifno/s-card-s-ifno.component';
import { CardContianerComponent } from './containers/card-contianer.component';

import { SCardContentComponent } from './cards/s-card-content/s-card-content.component';
import { GridContianerComponent } from './containers/grid-contianer.component';
import { MCardComponent } from './cards/m-card/m-card.component';

@NgModule({
  declarations: [
    AccordionComponent,
    ConfigeUiComponent,
    SCardSIfnoComponent,
    CardContianerComponent,
    SCardContentComponent,
    GridContianerComponent,
    MCardComponent,
  ],
  imports: [CommonModule],
  exports: [
    AccordionComponent,
    ConfigeUiComponent,
    SCardSIfnoComponent,
    CardContianerComponent,
    SCardContentComponent,
    GridContianerComponent,
    MCardComponent,
  ],
})
export class LibModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { ConfigeUiComponent } from './confige-ui/confige-ui.component';
import { SCardSIfnoComponent } from './cards/s-card-s-ifno/s-card-s-ifno.component';
import { CardContianerComponent } from './containers/card-contianer.component';
import { SCardContentComponent } from './cards/s-card-content/s-card-content.component';
import { GridContianerComponent } from './containers/grid-contianer.component';
import { MCardComponent } from './cards/m-card/m-card.component';
import { TableContianerComponent } from './containers/table-contianer/table-contianer.component';
import { STableCardComponent } from './cards/s-table-card/s-table-card.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [
    AccordionComponent,
    ConfigeUiComponent,
    SCardSIfnoComponent,
    CardContianerComponent,
    SCardContentComponent,
    GridContianerComponent,
    MCardComponent,
    TableContianerComponent,
    STableCardComponent,
    MapComponent,
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
    TableContianerComponent,
    STableCardComponent,
    MapComponent,
  ],
})
export class LibModule {}

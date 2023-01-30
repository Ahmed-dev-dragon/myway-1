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
import { ScectionContainersComponent } from './containers/scection-container.component';
import { DommyFormComponent } from './form/dommy-form/dommy-form.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  DateAdapter,
  CalendarModule as angularCalenders,
} from 'angular-calendar';
import { SplitterModule } from 'primeng/splitter';
import { TimeLineComponent as tl } from './time-line/time-line.component';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { ScrollerModule } from 'primeng/scroller';
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
    ScectionContainersComponent,
    DommyFormComponent,
    CalendarComponent,
    tl,
  ],
  imports: [
ScrollerModule,
    FormsModule,
    ButtonModule,
    SplitterModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    angularCalenders.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    TimelineModule,
  ],
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
    ScectionContainersComponent,
    DommyFormComponent,
    CalendarComponent,
    angularCalenders,
    tl,
  ],
})
export class LibModule {}












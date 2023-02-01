import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './others/accordion/accordion.component';
import { ConfigeUiComponent } from './others/confige-ui/confige-ui.component';
import { SCardSIfnoComponent } from './cards/cards1/s-card-s-ifno/s-card-s-ifno.component';
import { CardContianerComponent } from './containers/card-contianer.component';
import { SCardContentComponent } from './cards/cards1/s-card-content/s-card-content.component';
import { GridContianerComponent } from './containers/grid-contianer.component';
import { MCardComponent } from './cards/cards1/m-card/m-card.component';
import { TableContianerComponent } from './containers/table-contianer/table-contianer.component';
import { STableCardComponent } from './cards/cards1/s-table-card/s-table-card.component';
import { MapComponent } from './others/map/map.component';
import { ScectionContainersComponent } from './containers/scection-container.component';
import { DommyFormComponent } from './forms/dommy-form/dommy-form.component';
import { CalendarComponent } from './calendars/calendar.component';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {
  DateAdapter,
  CalendarModule as angularCalenders,
} from 'angular-calendar';
import { SplitterModule } from 'primeng/splitter';
import { TimeLineComponent as tl } from './others/time-line/time-line.component';
import { ButtonModule } from 'primeng/button';
import { TimelineModule } from 'primeng/timeline';
import { ScrollerModule } from 'primeng/scroller';
import { DinamicColComponent } from './sections/dinamic-col/dinamic-col.component';
import { DCardComponent } from './cards/cards1/d-card/d-card.component';
import { MDynamicCardComponent } from './cards/cards1/m-dynamic-card/m-dynamic-card.component';
import { CDinamicCalComponent } from './sections/c-dinamic-cal/c-dinamic-cal.component';
import { LibRouteModule } from './lib-routing.module';
import { LibErrorComponent } from './lib-error.component';
import { CardsModule } from './cards/cards.module';
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
    DinamicColComponent,
    DCardComponent,
    MDynamicCardComponent,
    CDinamicCalComponent,
    LibErrorComponent,
  ],
  imports: [
    LibRouteModule,
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
    CardsModule,
  ],
  exports: [
    CDinamicCalComponent,
    DCardComponent,
    DinamicColComponent,
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

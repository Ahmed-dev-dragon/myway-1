import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { ScrollerModule } from 'primeng/scroller';
import { LibRouteModule } from './lib-routing.module';
import { LibErrorComponent } from './lib-error.component';
import { CardsModule } from './cards/cards.module';
import { ChatesModule } from './chates/chates.module';
import { OtherModule } from './others/other.module';
import { SectionsModule } from './sections/sections.module';
import { TemplatesModule } from './templates/templates.module';

import { SCalendarModule } from './calendars/calendar.module';
import { TablesModule } from './tables/tables.module';
import { SFormModule } from './calendars/forms/form.module';
@NgModule({
  declarations: [LibErrorComponent],
  imports: [
    SCalendarModule,
    ChatesModule,
    TemplatesModule,
    OtherModule,
    SectionsModule,
    CardsModule,
    LibRouteModule,
    ScrollerModule,
    ButtonModule,
    SplitterModule,
    CommonModule,
    SFormModule,
    TablesModule,
    NgbModalModule,
  ],
  exports: [LibErrorComponent],
})
export class LibModule {}

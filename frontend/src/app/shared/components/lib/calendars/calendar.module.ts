import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { SCalendarComponent } from './dinamic-calindar/calendar.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  DateAdapter,
  CalendarModule as angularCalenders,

} from 'angular-calendar';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [SCalendarComponent, LayoutComponent],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    angularCalenders.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports: [SCalendarComponent, angularCalenders, LayoutComponent],
})
export class SCalendarModule {}

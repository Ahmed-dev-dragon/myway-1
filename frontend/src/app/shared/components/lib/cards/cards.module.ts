import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsRoutingModule } from './cards-routing.module';
import { MDynamicCardComponent } from './generique/m-dynamic-card/m-dynamic-card.component';
import { DCardComponent } from './unic/d-card/d-card.component';
import { STableCardComponent } from './unic/s-table-card/s-table-card.component';
import { SCardSIfnoComponent } from './unic/s-card-s-ifno/s-card-s-ifno.component';
import { SCardContentComponent } from './unic/s-card-content/s-card-content.component';
import { MCardComponent } from './unic/m-card/m-card.component';
import { LayoutComponent } from './layout/layout.component';
import { ContainersModule } from '../containers/containers.module';



@NgModule({
    declarations: [
        MDynamicCardComponent,
        DCardComponent,
        STableCardComponent,
        SCardSIfnoComponent,
        SCardContentComponent,
        MCardComponent,
        LayoutComponent,
    ],
    exports: [SCardContentComponent],
    imports: [
              CommonModule,
              CardsRoutingModule,
              ContainersModule,
              MDynamicCardComponent,
              DCardComponent,
              STableCardComponent,
              SCardSIfnoComponent,
              SCardContentComponent,
              MCardComponent,
              LayoutComponent,
            ]
})
export class CardsModule {}

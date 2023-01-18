import { ConfirmationService,MessageService } from 'primeng/api';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericPipe } from './pipes/generic.pipe';
import { PrettyPrintPipe } from './pipes/pretty-print.pipe';
import { ReadDataTablePipe } from './pipes/read-data-table.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { Page404Component } from './components/page404/page404.component';
import { SidbarComponent } from './components/sidbar/sidbar.component';
import { TaxonomieInputComponent } from './components/taxonomie-input/taxonomie-input.component';
import { TaxonomieTreeComponent } from './components/taxonomie-tree/taxonomie-tree.component';
import { UndoDeleteDialogComponent } from './components/undo-delete-dialog/undo-delete-dialog.component';
import { ContentLayoutComponent } from './components/layout/content-layout/content-layout.component';



@NgModule({
  declarations: [
    GenericPipe,
    PrettyPrintPipe,
    ReadDataTablePipe,
    FooterComponent,
    HeaderComponent,
    BreadcrumbComponent,
    DynamicTableComponent,
    Page404Component,
    SidbarComponent,
    TaxonomieInputComponent,
    TaxonomieTreeComponent,
    UndoDeleteDialogComponent,
    ContentLayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [],
  providers: [
    ConfirmationService,
    MessageService

  ]

})
export class SharedModule { }

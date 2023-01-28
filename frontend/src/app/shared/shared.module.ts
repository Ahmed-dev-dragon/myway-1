import { PrettyPrintPipe } from './pipes/pretty-print.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { PasswordModule } from 'primeng/password';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { RatingModule } from 'primeng/rating';
import { CalendarModule  } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { ChipsModule } from 'primeng/chips';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TreeSelectModule } from 'primeng/treeselect';
import { InputSwitchModule } from 'primeng/inputswitch';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SliderModule } from 'primeng/slider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ToastModule } from 'primeng/toast';
import { PanelMenuModule } from 'primeng/panelmenu';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { StepsModule } from 'primeng/steps';
import { TreeTableModule } from 'primeng/treetable';
import { SpeedDialModule } from 'primeng/speeddial';
import { FieldsetModule } from 'primeng/fieldset';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { SplitterModule } from 'primeng/splitter';

import { TaxonomieInputComponent } from './components/taxonomie-input/taxonomie-input.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContentLayoutComponent } from './components/layout/content-layout/content-layout.component';
import { DynamicTableComponent } from './components/dynamic-table/dynamic-table.component';
import { Page404Component } from './components/page404/page404.component';
import { ReadDataTablePipe } from './pipes/read-data-table.pipe';
import { UndoDeleteDialogComponent } from './components/undo-delete-dialog/undo-delete-dialog.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { GenericPipe } from './pipes/generic.pipe';
import { DynamicTableCellColorPipe } from './pipes/dynamic-table-cell-color.pipe';
import { DynamicTableCellColorPipeStyle } from './pipes/dynamic-table-cell-color-style.pipe';
import { TaxonomieTreeComponent } from './components/taxonomie-tree/taxonomie-tree.component';
import { TemplatesModule } from './components/templates/templates.module';
import { LibModule } from './components/lib/lib.module';
import { TestComponent } from './test/test.component';
import { SDynamicTableComponent } from './components/s-dynamic-table/s-dynamic-table.component';
import { FlatpickrModule } from 'angularx-flatpickr';


@NgModule({
  declarations: [
    SidebarComponent,

    TaxonomieInputComponent,
    HeaderComponent,
    FooterComponent,
    ContentLayoutComponent,
    DynamicTableComponent,
    Page404Component,
    ReadDataTablePipe,
    PrettyPrintPipe,
    UndoDeleteDialogComponent,
    BreadcrumbComponent,
    TaxonomieTreeComponent,
    GenericPipe,
    DynamicTableCellColorPipe,
    DynamicTableCellColorPipeStyle,
    TestComponent,
    SDynamicTableComponent,
  ],
  imports: [
    FlatpickrModule.forRoot(),

    TemplatesModule,
    LibModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DialogModule,
    DynamicDialogModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    MultiSelectModule,
    PasswordModule,
    AvatarModule,
    DropzoneModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    InputNumberModule,
    DropdownModule,
    ToggleButtonModule,
    CheckboxModule,
    TabViewModule,
    InputTextareaModule,
    KeyFilterModule,
    RatingModule,
    CalendarModule,
    InputMaskModule,
    ChipsModule,
    AutoCompleteModule,
    TreeSelectModule,
    InputSwitchModule,
    RadioButtonModule,
    SliderModule,
    SelectButtonModule,
    ToastModule,
    SelectButtonModule,
    TooltipModule,
    StepsModule,
    PanelMenuModule,
    ToolbarModule,
    TreeTableModule,
    SpeedDialModule,
    FieldsetModule,
    DividerModule,
    OverlayPanelModule,
    CardModule,
    VirtualScrollerModule,
    ProgressBarModule,
    LazyLoadImageModule,
    NgbModule,
    NgApexchartsModule,
    TieredMenuModule,
    SplitterModule,

  ],
  exports: [
    SidebarComponent,
    TaxonomieInputComponent,
    HeaderComponent,
    FooterComponent,
    ContentLayoutComponent,
    DynamicTableComponent,
    ReadDataTablePipe,
    PrettyPrintPipe,
    UndoDeleteDialogComponent,
    TaxonomieTreeComponent,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    DynamicDialogModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    MultiSelectModule,
    PasswordModule,
    AvatarModule,
    DropzoneModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    InputNumberModule,
    DropdownModule,
    ToggleButtonModule,
    CheckboxModule,
    TabViewModule,
    InputTextareaModule,
    KeyFilterModule,
    RatingModule,
    CalendarModule,
    InputMaskModule,
    ChipsModule,
    AutoCompleteModule,
    TreeSelectModule,
    InputSwitchModule,
    RadioButtonModule,
    SliderModule,
    SelectButtonModule,
    ToastModule,
    SelectButtonModule,
    TooltipModule,
    StepsModule,
    PanelMenuModule,
    ToolbarModule,
    TreeTableModule,
    SpeedDialModule,
    FieldsetModule,
    DividerModule,
    OverlayPanelModule,
    CardModule,
    VirtualScrollerModule,
    ProgressBarModule,
    LazyLoadImageModule,
    NgbModule,
    NgApexchartsModule,
    TieredMenuModule,
    SplitterModule,
    GenericPipe,
    DynamicTableCellColorPipe,
    DynamicTableCellColorPipeStyle,
    SDynamicTableComponent,
  ],
  providers: [ConfirmationService, MessageService],
})
export class SharedModule {}

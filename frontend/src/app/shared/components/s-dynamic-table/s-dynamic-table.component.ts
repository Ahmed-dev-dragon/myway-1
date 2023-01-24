import { UndoDeleteDialogService } from '../../services/undo-delete-dialog.service';
import { HelpersService } from 'src/app/shared/services/helpers.service';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ContentChild,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { MenuItem } from 'primeng/api';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import {
  ListCaptionConfig,
  ListHeader,
  OnDeleteEvent,
} from '../../models/List.model';

@Component({
  selector: 's-dynamic-table',
  templateUrl: './s-dynamic-table.component.html',
  styleUrls: ['./s-dynamic-table.component.scss'],
})
export class SDynamicTableComponent implements OnInit, OnChanges {
  @Input() data: any = [];
  @Input() cols: ListHeader[] = [];
  @Input() selectedCols: any = [];
  @Input() rows: any = 10;
  @Input() grid: boolean = true;
  @Input() captionConfig!: ListCaptionConfig;
  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }
  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.columns.filter((col: any) => {
      return val.includes(col);
    });
  }

  @ViewChild('dt') dataTable!: Table;

  @ContentChild('expandedRow', { static: false })
  public expandedRow!: TemplateRef<any>;

  @Output() onEditClick: EventEmitter<any> = new EventEmitter();
  @Output() onDetailClick: EventEmitter<any> = new EventEmitter();
  @Output() onCloneClick: EventEmitter<any> = new EventEmitter();
  @Output() onAddClick: EventEmitter<any> = new EventEmitter();
  @Output() onDelete: EventEmitter<OnDeleteEvent> = new EventEmitter();
  showColumn: string = 'up';
  columns: any[] = [];
  selectedItems: any = [];
  speedDialItems: any[] = [];
  initSpeedDialItems: MenuItem[] = [
    {
      id: 'csv',
      icon: 'pi pi-file',
      tooltipOptions: {
        tooltipLabel: 'export CSV',
        tooltipPosition: 'top',
      },
      // command: () => {
      //   this.dataTable.exportCSV();
      // },
    },
    {
      id: 'xls',
      icon: 'pi pi-file-excel',
      tooltipOptions: {
        tooltipLabel: 'export XLS',
        tooltipPosition: 'top',
      },
      // command: () => {
      //   this.exportExcel();
      // },
    },
    {
      id: 'pdf',
      icon: 'pi pi-file-pdf',
      tooltipOptions: {
        tooltipLabel: 'export PDF',
        tooltipPosition: 'top',
      },
      // command: () => {
      //   this.exportPdf();
      // },
    },
    {
      id: 'selection',
      icon: 'pi pi-filter',
      tooltipOptions: {
        tooltipLabel: 'export selection only',
        tooltipPosition: 'top',
      },
      // command: () => {
      //   this.dataTable.exportCSV({ selectionOnly: true });
      // },
    },
  ];
  globalFilterFields: string[] = [];
  demiRows = 0;
  _selectedColumns: any[] = [];
  exportColumns: any[] = [];
  changes: any = null;
  regex = /\{\{\s*data\.length\s*\}\}/g;
  initialCaptionConfig: ListCaptionConfig = {
    globalFilter: true,
    csv: false,
    pdf: false,
    xls: false,
    selection: false,
    displayedColumns: false,
    clearTable: true,
    refreshData: false,
    addButton: false,
    expanded: null,
    selectionType: 'single',
    summary: {
      enabled: true,
      message: 'In total there are {{data.length}} elements.',
    },
    buttons: [],
    actions: {
      clone: false,
      delete: false,
      edit: false,
      detail: false,
    },
  };

  constructor(
    private undoDialogService: UndoDeleteDialogService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public translateService: TranslateService,
    public helpers: HelpersService
  ) {
    if (this.config.data?.headers) {
      this.captionConfig = {
        ...this.initialCaptionConfig,
        ...this.config.data.captionConfig,
      };
      this.cols = this.config.data.headers || [];
      this.data = this.config.data.data;
      this.selectedItems = this.data.filter((item: any) => item.selected);
      if (
        this.captionConfig?.selectionType == 'single' &&
        this.selectedItems.length
      )
        this.selectedItems = this.selectedItems[0];
      this.translateService
        .get(this.config.header || '')
        .subscribe((translation) => {
          this.config.header = translation;
        });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['cols'] || changes?.['captionConfig']) {
      this.changes = changes;
    }
  }

  ngDoCheck() {
    if (this.changes) {
      this.columns = [...this.cols];

      this.columns = [...this._selectedColumns] = this.columns.map(
        (col: any) => {
          let val = { ...col };
          if (typeof val.header == 'object') {
            if (typeof val.header.data == 'object' && val.header.data.length) {
              val.header =
                val.header.data.find(
                  (d: any) => d.language == localStorage.getItem('lang')
                )?.value || val.header.data[0].value;
            } else val.header = val.header.data.value;
          }
          return val;
        }
      );

      if (this.changes.captionConfig) {
        const mergeCaptionConfigs = (
          newCaptionConfig: any,
          initConfig: any
        ) => {
          Object.keys(newCaptionConfig).forEach((key) => {
            if (initConfig[key] !== undefined) {
              if (
                initConfig[key] &&
                typeof initConfig[key] == 'object' &&
                !(initConfig[key] instanceof Array)
              ) {
                initConfig[key] = mergeCaptionConfigs(
                  newCaptionConfig[key],
                  initConfig[key]
                );
              } else {
                initConfig[key] = newCaptionConfig[key];
              }
            }
          });

          return initConfig;
        };

        this.captionConfig = mergeCaptionConfigs(
          this.captionConfig,
          this.helpers.newObject(this.initialCaptionConfig)
        );
      } else if (!this.captionConfig) {
        this.captionConfig = this.initialCaptionConfig;
      }

      this.speedDialItems = this.initSpeedDialItems.filter((item: any) => {
        // @ts-ignore
        return this.captionConfig[item.id];
      });

      this.globalFilterFields = this.cols.map((col) => col.field);

      this.changes = null;
    }

    if (this.dataTable && this.dataTable._columns) {
      this.selectedCols.splice(
        0,
        this.selectedCols.length,
        ...this.dataTable._columns
      );
    }
  }

  showColumnDtaills(index: number) {
    
    this.showColumn == 'up'
      ? (this.showColumn = 'down')
      : (this.showColumn = 'up');

  }

  onAdd() {
    this.onAddClick.emit();
  }

  onEdit(index: number) {
    this.onEditClick.emit(this.data[index]);
  }

  onDetail(index: number) {
    this.onDetailClick.emit(this.data[index]);
  }

  onClone(index: number) {
    this.onCloneClick.emit(this.data[index]);
  }

  test(event: any) {
    this._selectedColumns = event.value;
  }

  ngOnInit(): void {
    this.demiRows = Math.floor(this.rows / 2);
    this.columns = [];
    this.cols.map((col: any) => {
      this.columns.push({ ...col });
    });
    this._selectedColumns = [];
    this.columns.map((col: any) => {
      this._selectedColumns.push({ ...col });
    });

    this.exportColumns = this.columns?.map((col: any) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  exportPdf() {
    const doc = new jsPDF();
    //@ts-ignore
    doc.autoTable(this.exportColumns, this.data);
    doc.save('table.pdf');

    // jsPDF.then((jsPDF:any) => {
    //   import("jspdf-autotable").then(x => {
    //     const doc = new jsPDF.default(0, 0);
    //     doc.autoTable(this.exportColumns, this.data);
    //     doc.save('data.pdf');
    //   })
    // })
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'data');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  }

  changeState() {
    this.onDelete.emit({
      id: this.selectedItems.length
        ? this.selectedItems.map((item: any) => item._id)
        : [this.selectedItems?._id],
      etat: 'etatObjet.archive',
    });
    this.selectedItems = [];
  }

  showUndoDialog() {
    this.undoDialogService.showDialog((event) => {
      if (event.result == 'timeout') {
        this.changeState();
      }
    }, 2);
  }

  clear(table: Table) {
    this._selectedColumns = this.columns;

    table.clear();
  }

  saveSelectedItems() {
    this.ref.close(this.selectedItems);
  }
}

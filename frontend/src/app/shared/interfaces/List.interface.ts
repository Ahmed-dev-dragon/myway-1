import { pipe } from "../pipes/generic.pipe";

export interface OnDeleteEvent {
  id: string[];
  etat: "etatObjet.archive";
}

export interface ListHeader {
  field: string;
  header: string;
  sort?: boolean;
  filter?: boolean;
  filterType?:
    | "file"
    | "chips"
    | "text"
    | "date"
    | "numeric"
    | "boolean"
    | "template";
  filterData?: [];
  pipes?: pipe[];
  colorize?: {
    blue?: string | string[] | { inc: string | string[] };
    brown?: string | string[] | { inc: string | string[] };
    gray?: string | string[] | { inc: string | string[] };
    green?: string | string[] | { inc: string | string[] };
    indigo?: string | string[] | { inc: string | string[] };
    lime?: string | string[] | { inc: string | string[] };
    orange?: string | string[] | { inc: string | string[] };
    purple?: string | string[] | { inc: string | string[] };
    red?: string | string[] | { inc: string | string[] };
    teal?: string | string[] | { inc: string | string[] };
    yellow?: string | string[] | { inc: string | string[] };
  };
  colorizeStyle?: {
    match: string | string[] | { inc: string | string[] };
    backgroundColor: string;
    color: string;
  }[];
}

export interface expanded extends List {
  dataField: string;
}

export interface Button {
  label?: string;
  icon?: string;
  class?: string;
  style?: { [key: string]: any };
  command?: (rowIndex: number, rowData: any) => void;
}

export interface ListCaptionConfig {
  globalFilter?: boolean;
  csv?: boolean;
  pdf?: boolean;
  xls?: boolean;
  selection?: boolean;
  displayedColumns?: boolean;
  clearTable?: boolean;
  refreshData?: boolean;
  expanded?: expanded | null;
  addButton?: boolean;
  selectionType?: "single" | "multiple";
  summary?: {
    enabled?: boolean;
    message?: string;
  };
  buttons: Button[];
  actions?: {
    clone?: boolean;
    delete?: boolean;
    edit?: boolean;
    detail?: boolean;
    close?: boolean;
  };
}

export interface List {
  _id?: string;
  headers: ListHeader[];
  captionConfig: ListCaptionConfig | null;
  etatObjet?: "etatObject.active" | "etatObjet.archive";
  etatCreation?: string;
}

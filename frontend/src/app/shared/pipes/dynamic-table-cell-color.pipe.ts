import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicTableCellColor',
})
export class DynamicTableCellColorPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!args?.[0]) return '';

    let color = '';

    for (const key of Object.keys(args[0])) {
      let val = args[0][key];

      if (val?.inc !== null && val?.inc !== undefined) {
        if (val.inc instanceof Array) {
          val.inc.some((v: any) => value.includes(v)) && (color = key);
        } else {
          value.includes(val.inc) && (color = key);
        }
      } else {
        if (val instanceof Array) {
          val.some((v: any) => value == v) && (color = key);
        } else {
          value == val && (color = key);
        }
      }
    }

    if (!color) return '';

    return `table-cell-badge ${color}-badge`;
  }
}

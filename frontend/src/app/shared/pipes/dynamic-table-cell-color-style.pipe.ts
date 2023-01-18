import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dynamicTableCellColorStyle',
})
export class DynamicTableCellColorPipeStyle implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!args?.[0]) return '';

    let options = args[0];

    let styleTemplate =
      'border-radius: 5px;padding: 0.4rem;text-transform: uppercase;font-weight: 700;font-size: 12px;letter-spacing: 0.3px;';

    let option = options?.find((option: any) => {
      let { match } = option;

      if (!match) return false;

      if (match?.inc) {
        if (
          match.inc instanceof Array &&
          match.inc.some((m: any) => value.includes(m))
        ) {
          return true;
        } else if (value.includes(match.inc)) {
          return true;
        }
      } else {
        if (match instanceof Array && match.some((m: any) => value == m)) {
          return true;
        } else if (value == match) {
          return true;
        }
      }

      return false;
    });

    return option && option.backgroundColor && option.color
      ? `${styleTemplate}background-color:${option.backgroundColor};color:${option.color}`
      : '';
  }
}

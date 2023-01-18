import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readDataTable',
})
export class ReadDataTablePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): any {
    if (!value) return value;

    let field: any = args[0];


    let recF = (field: any, data: any): any => {
      if (field.split('.').length == 1) return data[field];

      let newData = data[field.split('.')[0]];
      if (!newData) return newData;

      return newData instanceof Array
        ? newData.map((d: any) => recF(field.split('.').slice(1).join('.'), d))
        : recF(field.split('.').slice(1).join('.'), newData);
    };
    if (field.includes('$xor')) {
      let val = ''
      field.split(/\s?\$xor\s?/g).find((f: any) =>
        val = f.includes('$or') || f.includes('$concat')
          ? f
            .split(/\s?(\$or|\$concat)\s?/g).filter((v: any) => !['$or', '$concat'].includes(v))
            .map((f: string) => recF(f, value))
            .join(' ')?.trim() : recF(f, value)
      )
      return val
    } else {

      return field.includes('$or') || field.includes('$concat')
        ? field
          .split(/\s?(\$or|\$concat)\s?/g).filter((v: any) => !['$or', '$concat'].includes(v))
          .map((f: string) => recF(f, value))
          .join(' ')
        : recF(field, value)
    }




  }
}

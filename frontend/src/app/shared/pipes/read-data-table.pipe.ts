import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readDataTable'
})
export class ReadDataTablePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

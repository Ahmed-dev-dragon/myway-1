import { Pipe, PipeTransform } from '@angular/core';


// export interface Pipe{
//   name:
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |
// |

// }


@Pipe({
  name: 'generic'
})
export class GenericPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}

import {
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  JsonPipe,
  LowerCasePipe,
  PercentPipe,
  TitleCasePipe,
  UpperCasePipe,
} from '@angular/common';
import {
  ChangeDetectorRef,
  Inject,
  LOCALE_ID,
  Pipe,
  PipeTransform,
} from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

export type pipe =
  | {
      name: 'date';
      arguments?: string;
    }
  | {
      name: 'titlecase';
    }
  | {
      name: 'currency';
      arguments?: string;
    }
  | {
      name: 'decimal';
      arguments?: string;
    }
  | {
      name: 'json';
    }
  | {
      name: 'lowercase';
    }
  | {
      name: 'uppercase';
    }
  | {
      name: 'percent';

      arguments?: string;
    }
  | {
      name: 'replace';
      arguments: {
        pattern: string | RegExp;
        replaceValue: any;
        flags?: string;
      };
    }
  | {
      name: 'map';
      arguments: {
        [key: string]: any;
      };
    }
  | {
      name: 'slice';
      arguments: {
        start?: number;
        end?: number;
      };
    }
  | {
      name: 'translate';
      arguments?: any[];
    };

@Pipe({
  name: 'genericPipe',
})
export class GenericPipe implements PipeTransform {
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private translateService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  transform(value: any, ...args: any[]): any {
    if (args[0]) {
      return args[0].reduce((prevVal: any, pipe: any) => {
        switch (pipe.name) {
          case 'date':
            return prevVal
              ? new DatePipe(this.locale).transform(prevVal, pipe.arguments)
              : prevVal;

          case 'titlecase':
            return prevVal ? new TitleCasePipe().transform(prevVal) : prevVal;

          case 'currency':
            return prevVal
              ? new CurrencyPipe(this.locale).transform(prevVal, pipe.arguments)
              : prevVal;

          case 'decimal':
            return prevVal
              ? new DecimalPipe(this.locale).transform(prevVal, pipe.arguments)
              : prevVal;

          case 'json':
            return prevVal ? new JsonPipe().transform(prevVal) : prevVal;

          case 'lowercase':
            return prevVal ? new LowerCasePipe().transform(prevVal) : prevVal;

          case 'uppercase':
            return prevVal ? new UpperCasePipe().transform(prevVal) : prevVal;

          case 'percent':
            return prevVal
              ? new PercentPipe(this.locale).transform(prevVal, pipe.arguments)
              : prevVal;

          case 'replace':
            return prevVal
              ? prevVal.replace(
                  new RegExp(pipe.arguments.pattern, pipe.arguments.flags),
                  pipe.arguments.replaceValue
                )
              : prevVal;

          case 'map':
            let options = pipe.arguments;
            for (let key of Object.keys(options)) {
              let val = options[key];

              if (val?.inc) {
                if (val.inc instanceof Array) {
                  val.inc.some((v: any) => value.includes(v)) && (value = key);
                } else {
                  value.includes(val.inc) && (value = key);
                }
              } else {
                if (val instanceof Array) {
                  val.some((v: any) => value == v) && (value = key);
                } else {
                  value == val && (value = key);
                }
              }
            }

            return value;

          case 'slice':
            return prevVal.substring(
              pipe.arguments.start || 0,
              pipe.arguments.end
            );

          case 'translate':
            return new TranslatePipe(
              this.translateService,
              this.changeDetectorRef
            ).transform(prevVal, pipe.arguments);

          // case '':
          //   return new ().transform(prevVal, pipe.arguments);

          default:
            return prevVal;
        }
      }, value);
    }

    return value;
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendValues'
})
export class AppendValuesPipe implements PipeTransform {
  transform(...args: any[]): unknown {

    return args.join('_');
  }
}

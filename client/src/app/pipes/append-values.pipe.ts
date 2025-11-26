import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendValues',
  standalone: false,
})
export class AppendValuesPipe implements PipeTransform {
  transform(...args: any[]): unknown {

    return args.join('_');
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';
import moment from 'moment';

@Pipe({
  name: 'dateDisplay',
  standalone: false,
})
export class DateDisplayPipe implements PipeTransform {
  private readonly formats = ['DDMMMMY hh:mm:ss a', 'MMMMDDY hh:mm:ss a', 'MMM D YYYY h:mma'];

  transform(value: string | Date | undefined | null, format = 'MMM dd, yy'): string {
    if (!value) {
      return '';
    }

    if (value instanceof Date) {
      return formatDate(value, format, 'en-CA');
    }

    const parsed = moment(value, this.formats);
    if (!parsed.isValid()) {
      return value;
    }

    return formatDate(parsed.toDate(), format, 'en-CA');
  }
}

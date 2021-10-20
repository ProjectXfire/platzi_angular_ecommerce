import { Pipe, PipeTransform } from '@angular/core';
// Providers
import { formatDistance } from 'date-fns';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): unknown {
    return formatDistance(new Date(), value);
  }
}

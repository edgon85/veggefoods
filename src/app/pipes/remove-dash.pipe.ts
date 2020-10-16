import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDash',
})
export class RemoveDashPipe implements PipeTransform {
  transform(value: string): string | boolean {
    if (value == null) {
      return value;
    }
    const word = value.split('-').join(' ');
    return word;
  }
}

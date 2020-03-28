import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deleteRepeat'
})
export class DeleteRepeatPipe implements PipeTransform {
  transform(products: any, ...args: any[]): any {
    return [...new Set(products)];
  }
}

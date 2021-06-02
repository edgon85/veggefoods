import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noImage',
})
export class NoImagePipe implements PipeTransform {
  transform(img: string): string {
    if (img === '') {
      img = 'assets/images/product-error.png';
      return img;
    } else {
      return img;
    }

    return null;
  }
}

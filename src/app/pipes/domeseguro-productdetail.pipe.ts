import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'domeseguroProductdetail',
})
export class DomeseguroProductdetailPipe implements PipeTransform {
  constructor(private domSanitaizer: DomSanitizer) {}

  transform(value: string, ...args: any[]): SafeHtml {
    return this.domSanitaizer.bypassSecurityTrustHtml(value);
  }
}

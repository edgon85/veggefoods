import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header-product',
  templateUrl: './header-product.component.html',
  styleUrls: ['./header-product.component.scss']
})
export class HeaderProductComponent implements OnInit {
  // tslint:disable-next-line: no-input-rename
  @Input('titulo') title = '';

  constructor() {}

  ngOnInit() {}
}

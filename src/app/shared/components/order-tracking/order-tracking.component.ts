import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-order-tracking',
  templateUrl: './order-tracking.component.html',
  styleUrls: ['./order-tracking.component.scss'],
})
export class OrderTrackingComponent implements OnInit {
  //

  // tslint:disable-next-line: no-input-rename
  @Input('my-order-date') orderDate: string = '';
  // tslint:disable-next-line: no-input-rename
  @Input('order-processed') orderProcessed: boolean = false;
  // tslint:disable-next-line: no-input-rename
  @Input('order-shipped') orderShipped: boolean = false;
  // tslint:disable-next-line: no-input-rename
  @Input('order-inRoute') orderInRoute: boolean = false;
  // tslint:disable-next-line: no-input-rename
  @Input('order-arrived') orderArrived: boolean = false;

  constructor() {}

  ngOnInit() {}
}

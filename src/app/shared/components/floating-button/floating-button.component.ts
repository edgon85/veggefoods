import { Component, OnInit } from '@angular/core';
declare function init_plu_flating();

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss'],
})
export class FloatingButtonComponent implements OnInit {
  constructor() {}

  categories = [
    'verduras',
    'frutas',
    'semillas',
    'especias',
    'carnes',
    'combos',
    'orgánico',
    'varios',
  ];

  ngOnInit() {
    init_plu_flating();
  }
}

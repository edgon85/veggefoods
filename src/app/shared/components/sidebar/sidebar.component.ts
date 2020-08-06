import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories = [
    'verduras',
    'frutas',
    'semillas',
    'especias',
    'combos',
    'orgánico',
    'varios',
  ];
  constructor() {}

  ngOnInit() {}
}

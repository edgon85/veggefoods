import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories = [
    'frutas',
    'verduras',
    'semillas',
    'especias',
    'jugos',
    'combos',
  ];
  constructor() {}

  ngOnInit() {}
}

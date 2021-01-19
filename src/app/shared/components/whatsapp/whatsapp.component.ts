import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.scss'],
})
export class WhatsappComponent implements OnInit {
  phoneNumber: string = '50251367524';
  sendText: string = 'Hola! Quisiera más información sobre los productos.';

  constructor() {}

  ngOnInit() {}
}
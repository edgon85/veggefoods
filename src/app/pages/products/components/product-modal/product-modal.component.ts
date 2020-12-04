import { Component, OnInit } from '@angular/core';
import { ProductModalService } from 'src/app/services/product-modal.service';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {


  constructor(public modalProducService: ProductModalService) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalProducService.closeModal();
  }

}

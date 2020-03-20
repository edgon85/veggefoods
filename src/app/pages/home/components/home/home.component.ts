import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ProductoModel } from 'src/app/models/product.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  productos: ProductoModel[] = [];
  cargando: boolean = false;

  constructor(private _productService: ProductService) {
    this.obtenerDestacados();
  }

  ngOnInit() {}

  obtenerDestacados() {
    this._productService
      .getAllProducts()
      .pipe(map(p => p.filter(f => f.destacado === true)))
      .subscribe(resp => {
        this.productos = resp;
        console.log(this.productos);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-carne',
  templateUrl: './carne.component.html',
  styleUrls: ['../../../organicos/components/organicos/organicos.component.scss']
})
export class CarneComponent implements OnInit {

  productos: ProductoModel[] = [];
  cargando: boolean = false;


  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.obtenerProductos();
  }


  obtenerProductos() {
    this.productService
      .getAllProducts()
      .pipe(map((p) => p.filter((f) => f.categoria === 'carnes')))
      .subscribe((resp) => {
        this.productos = resp.sort((a, b) => a.nombre.localeCompare(b.nombre)); // ordenar alfabeticamente
        // console.log(this.productos);
        this.cargando = false;
      });
  }
}

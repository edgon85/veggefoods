import { Component, OnInit } from '@angular/core';
import { ProductoModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-varios',
  templateUrl: './varios.component.html',
  styleUrls: ['../../../organicos/components/organic-detail/organic-detail.component.scss']
})
export class VariosComponent implements OnInit {

  productos: ProductoModel[] = [];
  cargando: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productService
      .getAllProducts()
      .pipe(map((p) => p.filter((f) => f.categoria === 'varios')))
      .subscribe((resp) => {
        this.productos = resp.sort((a, b) => a.nombre.localeCompare(b.nombre)); // ordenar alfabeticamente
        // console.log(this.productos);
        this.cargando = false;
      });
  }

}

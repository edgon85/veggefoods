import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { map } from 'rxjs/operators';
import { ProductoModel } from '../../../../models/product.model';

@Component({
  selector: 'app-organicos',
  templateUrl: './organicos.component.html',
  styleUrls: ['./organicos.component.scss'],
})
export class OrganicosComponent implements OnInit {
  productos: ProductoModel[] = [];
  cargando: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productService
      .getAllProducts()
      .pipe(map((p) => p.filter((f) => f.categoria === 'orgánico')))
      .subscribe((resp) => {
        this.productos = resp.sort((a, b) => a.nombre.localeCompare(b.nombre)); // ordenar alfabeticamente
        // console.log(this.productos);
        this.cargando = false;
      });
  }
}

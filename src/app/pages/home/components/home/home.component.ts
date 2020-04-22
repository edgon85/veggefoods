import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ProductoModel } from 'src/app/models/product.model';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productos: ProductoModel[] = [];
  cargando: boolean = false;

  // tslint:disable-next-line: variable-name
  constructor(private _productService: ProductService, private router: Router) {
    this.obtenerDestacados();
  }

  ngOnInit() {
    this.cargando = true;
    this.obtenerDestacados();
  }

  obtenerDestacados() {
    this._productService
      .getAllProducts()
      .pipe(map((p) => p.filter((f) => f.destacado === true)))
      .subscribe((resp) => {
        this.productos = resp;
        this.cargando = false;
      });
  }

  navigateTo(category: string) {
    if (category === 'busqueda') {
      this.router.navigateByUrl('/busqueda/q=');
    } else {
      this.router.navigateByUrl(`/productos/categoria/${category}`);
    }
  }
}

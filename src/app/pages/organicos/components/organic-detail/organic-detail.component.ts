import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ProductoModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-organic-detail',
  templateUrl: './organic-detail.component.html',
  styleUrls: ['./organic-detail.component.scss'],
})
export class OrganicDetailComponent implements OnInit {
  productos: ProductoModel[] = [];
  cargando: boolean = false;

  title: string = '';

  paramOrganicId: any;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.paramOrganicId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.cargando = true;
    this.changeName(this.paramOrganicId);
    this.obtenerProductos(this.paramOrganicId);
  }


  /* ============================================ */
  /* Obtener productos */
  /* ============================================ */
  obtenerProductos(idOrganicProduct: string) {
    this.productService
      .getAllProducts()
      .pipe(
        map((p) => {
          let filtrar = p.filter((f) => f['subcategoria'] === idOrganicProduct);
          this.productos = filtrar.sort((a, b) =>
            a.nombre.localeCompare(b.nombre)
          );
          this.cargando = false;
        })
      )
      .subscribe();
  }


  /* ============================================ */
  /* Cambiar titulo del producto orgánico */
  /* ============================================ */
  changeName(name: string) {
    switch (name) {
      case 'cafe':
        this.title = 'Café';
        break;
      case 'q-chips':
        this.title = 'q chips';
        break;
      default:
        this.title = name;
        break;
    }
  }
}

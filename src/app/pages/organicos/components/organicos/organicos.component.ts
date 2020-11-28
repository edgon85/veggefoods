import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { map } from 'rxjs/operators';
import { ProductoModel } from '../../../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organicos',
  templateUrl: './organicos.component.html',
  styleUrls: ['./organicos.component.scss'],
})
export class OrganicosComponent implements OnInit {


  organicos: any[] = [];
  cargando: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.cargando = true;
    this.obtenerlistaDeOrganicos();
  }

  obtenerlistaDeOrganicos() {
    this.productService
      .getlistaOrganicos()
      .pipe(
        map((p) => {
          let filtrar = p.filter((f) => f['disponible'] === true);
          this.organicos = filtrar;
          this.cargando = false;
        })
      )
      .subscribe();
  }

  selectItem(organicId: string) {
    // this.router.navigate([`/productos/categoria/orgánicos/${organicId}`, { 'organicId': organicId }])
    this.router.navigate(['/productos/categoria/orgánicos', organicId]);
  }
}

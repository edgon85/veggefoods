import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ProductoModel } from 'src/app/models/product.model';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SettingsService } from '../../../../services/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productos: ProductoModel[] = [];
  cargando: boolean = false;
  finDeSemana: boolean = false;

  // tslint:disable-next-line: variable-name
  constructor(
    private _productService: ProductService,
    private settingsServise: SettingsService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.getSettings();
    this.cargando = true;
    // this.obtenerDestacados();
  }

  // obtener settings
  private getSettings() {
    this.settingsServise.getProntoPosible().subscribe((resp: any) => {
      this.finDeSemana = resp.fin_de_semana;
    });
  }

  obtenerDestacados() {
    this._productService.getProductosDesacados().subscribe((resp) => {
      this.productos = resp.sort((a, b) => a.nombre.localeCompare(b.nombre));
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

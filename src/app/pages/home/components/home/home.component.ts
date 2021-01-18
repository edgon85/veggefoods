import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../services/product.service';
import { ProductoModel } from 'src/app/models/product.model';
import { Router } from '@angular/router';
import { SettingsService } from '../../../../services/settings.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  dataCards: any = [
    {
      titleCard: 'Favorito',
      subtitleCard: 'del Mes',
      name: 'Choclate',
      image: 'assets/images/home/chocolate.png',
      url: 'cuadril-y-pierna-1602277221456',
      precio: 0.0,
      descuento: 0.0
    },
    {
      titleCard: 'Nuestra',
      subtitleCard: 'recomendación',
      name: 'Pollo',
      image: 'assets/images/home/pollo.png',
      url: 'chocolate-para-beber-sabor-natural-1595047522764',
      precio: 0.0,
      descuento: 0.0
    },
    {
      titleCard: 'Promoción',
      subtitleCard: 'de la semana',
      name: 'Horchata de Soya',
      image: 'assets/images/home/soya.png',
      url: 'horchata-de-soya-16-oz-1596776753454',
      precio: 25,
      descuento: 35
    }
  ];


  productos: ProductoModel[] = [];
  cargando: boolean = false;
  finDeSemana: boolean = false;

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

  naviagatePromo(product: string){
    this.router.navigateByUrl(`/producto/${product}`);
  }


  naviagateCombo(){
    this.router.navigateByUrl(`/productos/categoria/combos`);
  }
}

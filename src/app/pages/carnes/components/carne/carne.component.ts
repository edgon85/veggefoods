import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductoModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-carne',
  templateUrl: './carne.component.html',
  styleUrls: ['./carne.component.scss']
})
export class CarneComponent implements OnInit {

  @ViewChild('eyelashBeef', { static: true }) eyelashBeef: ElementRef;
  @ViewChild('eyelashChicken', { static: true }) eyelashChiken: ElementRef;
  @ViewChild('eyelashSeaFood', { static: true }) eyelashSeaFood: ElementRef;

  btnBeef: boolean = false;
  btnChicken: boolean = false;
  btnSeaFood: boolean = false;


  productos: ProductoModel[] = [];
  cargando: boolean = false;


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.eyelashBeef.nativeElement.classList.add('btnSelected');
    this.btnBeef = true;
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


  selectEyelashBeef(){
    this.btnBeef = true;
    this.btnChicken = false;
    this.btnSeaFood = false;
    this.eyelashBeef.nativeElement.classList.add('btnSelected');
    this.eyelashChiken.nativeElement.classList.remove('btnSelected');
    this.eyelashSeaFood.nativeElement.classList.remove('btnSelected');
  }

  selectEyelashChicken(){
    this.btnBeef = false;
    this.btnChicken = true;
    this.btnSeaFood = false;
    this.eyelashBeef.nativeElement.classList.remove('btnSelected');
    this.eyelashChiken.nativeElement.classList.add('btnSelected');
    this.eyelashSeaFood.nativeElement.classList.remove('btnSelected');
  }
  selectEyelashSeaFood(){
    this.btnBeef = false;
    this.btnChicken = false;
    this.btnSeaFood = true;
    this.eyelashBeef.nativeElement.classList.remove('btnSelected');
    this.eyelashChiken.nativeElement.classList.remove('btnSelected');
    this.eyelashSeaFood.nativeElement.classList.add('btnSelected');
  }


}

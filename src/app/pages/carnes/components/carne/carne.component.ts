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

  btnBeef: boolean = false;
  btnChicken: boolean = false;


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
    this.eyelashBeef.nativeElement.classList.add('btnSelected');
    this.eyelashChiken.nativeElement.classList.remove('btnSelected');
  }

  selectEyelashChicken(){
    this.btnBeef = false;
    this.btnChicken = true;
    this.eyelashBeef.nativeElement.classList.remove('btnSelected');
    this.eyelashChiken.nativeElement.classList.add('btnSelected');
  }


}

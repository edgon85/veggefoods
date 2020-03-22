import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetRutasService } from '../../../../rutas/get-rutas.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  categoria: string = '';

  constructor(
    private router: ActivatedRoute,
    private _getRutas: GetRutasService
  ) {
    this.obtenerUltimoParametro();
  }

  ngOnInit() {}

  /*   // ========================================================== //
  // obtener parametros de la url //
  // ========================================================== //
  obtenerParametrosUrl() {
    this.router.parent.params.subscribe(parametros => {
      this.categoria = parametros.id.split('-').join(' ');
      console.log(this.categoria);
    });
  } */

  // ========================================================== //
  // obtener el ultimo parametro de la url //
  // ========================================================== //
  obtenerUltimoParametro() {
    this._getRutas.getRutas().subscribe(resp => {
      this.categoria = resp.path.split('-').join(' ');
      console.log(this.categoria);
    });
  }
}

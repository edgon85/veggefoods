import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-como-funciona',
  templateUrl: './como-funciona.component.html',
  styleUrls: ['./como-funciona.component.scss'],
})
export class ComoFuncionaComponent implements OnInit {
  constructor(private router: Router, private user: AuthService) {}

  ngOnInit() {}

  irProductos(destino: string) {
    switch (destino) {
      case 'seleccionar':
        this.router.navigateByUrl(`/productos/categoria/verduras`);
        break;
      case 'finalizar':
        this.router.navigateByUrl(`/cart`);
        break;
      case 'enviar':
        this.user.getStatus().subscribe((resp) => {
          if (resp != null) {
            this.router.navigateByUrl(`/cuenta/pedidos`);
          }
        });
        break;
    }
  }
}

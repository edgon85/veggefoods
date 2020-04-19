import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  total$: Observable<number>;

  isloggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.loggedIn();
    this.total$ = this.cartService.cart$.pipe(
      map((products) => products.length)
    );
  }

  ngOnInit() {}

  logout() {
    this.authService.logout().then(() => {
      this.router.navigateByUrl('/auth/login');
      localStorage.removeItem('redirectProd');
      localStorage.removeItem('ckeckoutUrl');
    });
  }

  loggedIn() {
    this.authService.getStatus().subscribe((auth) => {
      if (!auth) {
        // console.log('LOGGED OUT!!');
        this.isloggedIn = false;
        return;
      }

      this.isloggedIn = true;

      // do your stuff here ..
    });
  }

  buscar(termino: string) {
    if (termino === '') {
      return;
    }

    this.router.navigate(['/busqueda', termino]);
  }
}

import { Component, ElementRef, OnInit } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

declare function init_plugin_navbar();

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
    private router: Router,
    private elem: ElementRef
  ) {
    this.loggedIn();
    this.total$ = this.cartService.cart$.pipe(
      map((products) => products.length)
    );
  }


  ngOnInit() {
    init_plugin_navbar();
  }

  logout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigateByUrl('/auth/login');
        localStorage.removeItem('redirectProd');
        localStorage.removeItem('ckeckoutUrl');
      })
      .catch((err) => {
        console.log('Sesión cerrada');
      });
  }

  loggedIn() {
    this.authService.getStatus().subscribe((auth) => {
      if (!auth) {
        this.isloggedIn = false;
        return;
      }

      this.isloggedIn = true;

      // do your stuff here ..
    });
  }

  redirectBuscar(param: string) {
    if (param === 'search') {
      this.router.navigateByUrl('/busqueda/q=');
    } else {
      this.router.navigateByUrl('/cart');
    }
  }

  removeClases() {
    let menu = this.elem.nativeElement.querySelector('.menu-list');
    let menubtn = this.elem.nativeElement.querySelector('.menu-btn');
    let cartBtn = this.elem.nativeElement.querySelector('.cart-btn');
    let searchBtn = this.elem.nativeElement.querySelector('.search-btn');
    let myBody = this.elem.nativeElement.querySelector('body');
    let dropdownTienda = this.elem.nativeElement.querySelector('.tienda');
    let dropdownCuenta = this.elem.nativeElement.querySelector('.cuenta');



    if (menu.classList.contains('active')) {
      menu.classList.remove('active');
      menubtn.classList.remove('hide');
      cartBtn.classList.remove('hide');
      searchBtn.classList.remove('hide');
      // myBody.classList.remove('disabledScroll');
      dropdownTienda.classList.remove('hide');
      dropdownCuenta.classList.remove('hide');
    }
  }
}

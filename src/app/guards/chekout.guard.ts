import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ChekoutGuard implements CanActivate {
  //
  totalCartItem$: Observable<number>;
  totalItems: number;

  constructor(
    private auth: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.cartService.cart$
      .pipe(map((products) => (this.totalItems = products.length)))
      .subscribe();
  }

  canActivate(): Observable<boolean> {
    return this.auth.getStatus().pipe(
      map((status) => {
        if (!status) {
          this.router.navigate(['/auth/login']);
          return false;
        } else if (status && this.totalItems === 0) {
          this.router.navigate(['/cart']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}

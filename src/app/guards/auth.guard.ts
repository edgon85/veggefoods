import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.auth.getStatus().pipe(
      map(status => {
        if (status) {
          // console.log('Paso por el guard');
          return true;
        } else {
          this.router.navigate(['/auth/login']);
          // console.log('bloqueado por el guard');
          return false;
        }
      })
    );
  }
}

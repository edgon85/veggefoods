import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-account',
  templateUrl: './sidebar-account.component.html',
  styleUrls: ['./sidebar-account.component.scss'],
})
export class SidebarAccountComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logout() {
    this.authService.logout().then(() => this.router.navigateByUrl('/inicio'));
  }
}

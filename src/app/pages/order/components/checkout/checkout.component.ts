import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  //

  constructor(private auth: AuthService) {
    this.auth.getuser().subscribe(resp => console.log(resp.uid));
  }
  ngOnInit() {}

  logout() {
    this.auth.logout();
  }
}

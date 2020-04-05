import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {
  constructor(private auth: AuthService) {
    console.log(auth.userUId);
  }
  ngOnInit() {}
  ngAfterViewInit(): void {
    this.auth.getUserByID(this.auth.userUId).subscribe(console.log);
  }
}

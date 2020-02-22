import { Component, OnInit, AfterViewInit } from '@angular/core';
// import Swiper from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // AfterViewInit
  // mySwiper: Swiper;

  constructor() {}

  ngOnInit() {}

  // ngAfterViewInit(): void {
  //   this.mySwiper = new Swiper('.swiper-container', {
  //     spaceBetween: 30,
  //     centeredSlides: true,
  //     autoplay: {
  //       delay: 2500,
  //       disableOnInteraction: false
  //     },
  //     pagination: {
  //       el: '.swiper-pagination',
  //       clickable: true
  //     },
  //     navigation: {
  //       nextEl: '.swiper-button-next',
  //       prevEl: '.swiper-button-prev'
  //     }
  //   });
  // }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { logging } from 'protractor';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, AfterViewInit {
  images: string[] = [
    'assets/images/bg_1.jpg'
    // 'assets/images/bg_2.jpg'
  ];

  banerData = [
    {
      image: 'assets/images/bg_1.jpg',
      title: 'Servimos frutas y verduras frescas',
      subtitle: 'Entregamos frutas y verduras orgánicas'
    },
    {
      image: 'assets/images/bg_2.jpg',
      title: 'Alimentos 100% frescos y orgánicos',
      subtitle: 'Entregamos frutas y verduras orgánicas'
    }
  ];

  mySwiper: Swiper;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      }
    });
  }
}

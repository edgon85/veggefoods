import { Component, OnInit, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit, AfterViewInit {
  images: string[] = [
    'assets/images/bg_7.jpg',
    // 'assets/images/bg_2.jpg'
  ];

  banerData = [
    {
      image: 'assets/images/bg_7.jpg',
      title: 'Frutas y verduras a domicilio',
      subtitle: 'Precios accesibles, lo mejor para tí',
    },
    {
      image: 'assets/images/bg_4.jpg',
      title: 'Alimentos 100% frescos',
      subtitle: 'Precios accesible, lo mejor para tí',
    },
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
        disableOnInteraction: false,
      },
    });
  }
}

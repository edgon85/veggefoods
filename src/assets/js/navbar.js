function init_plugin_navbar() {
  (() => {
    'use strict';

    const body = document.querySelector('body');
    const navbar = document.querySelector('.navbar');
    const menu = document.querySelector('.menu-list');
    const menubtn = document.querySelector('.menu-btn');
    const cancelBtn = document.querySelector('.cancel-btn');
    const searchBtn = document.querySelector('.search-btn');
    const cartBtn = document.querySelector('.cart-btn');

    const mTienda = document.querySelector('.m-tienda');
    const mCuenta = document.querySelector('.m-cuenta');

    const dropdownTienda = document.querySelector('.tienda');
    const dropdownCuenta = document.querySelector('.cuenta');

    // const linksTienda = document.querySelectorAll('.dropdown-link-tienda');
    const links = document.querySelectorAll('li');

    const addClasses = () => {
      menu.classList.add('active');
      menubtn.classList.add('hide');
      cartBtn.classList.add('hide');
      searchBtn.classList.add('hide');
      body.classList.add('disabledScroll');
      dropdownTienda.classList.add('hide');
      dropdownCuenta.classList.add('hide');
    };

    const removeClasses = () => {
      menu.classList.remove('active');
      menubtn.classList.remove('hide');
      cartBtn.classList.remove('hide');
      searchBtn.classList.remove('hide');
      body.classList.remove('disabledScroll');
      dropdownTienda.classList.remove('hide');
      dropdownCuenta.classList.remove('hide');
    };

    menubtn.addEventListener('click', () => addClasses());
    cancelBtn.addEventListener('click', () => removeClasses());

    window.onscroll = () => {
      this.scrollY > 40
        ? navbar.classList.add('stiky')
        : navbar.classList.remove('stiky');
    };

    mTienda.addEventListener('click', () => {
      dropdownTienda.classList.toggle('hide');
    });

    mCuenta.addEventListener('click', () => {
      dropdownCuenta.classList.toggle('hide');
    });

    const closeMenu = () => {
      // console.log(linksTienda);
      console.log(links);
      /* for (let i = 0; i < links.length; i++) {
        console.log(i);
        links[i].addEventListener('click', () => {
          removeClasses();
        });
      } */
    };

    // closeMenu();
  })();
}

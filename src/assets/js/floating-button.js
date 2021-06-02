function init_plu_flating() {
  (() => {
    'use strict';
    const btnFloating = document.querySelector('.fab');
    const box = document.querySelector('.box');

    btnFloating.addEventListener('click', () => {
      box.classList.toggle('box-active');
    });
  })();
}

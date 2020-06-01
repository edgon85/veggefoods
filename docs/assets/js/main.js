/* AOS.init({
  duration: 800,
  easing: 'slide',
}); */

(function ($) {
  'use strict';

  $('.navbar>li').on('click', function () {
    $('.navbar-collapse').collapse('hide');
  });

  // scroll
  var scrollWindow = function () {
    $(window).scroll(function () {
      var $w = $(this),
        st = $w.scrollTop(),
        navbar = $('.ftco_navbar'),
        sd = $('.js-scroll-wrap');

      if (st > 100) {
        if (!navbar.hasClass('scrolled')) {
          navbar.addClass('scrolled');
        }
      }
      if (st < 100) {
        if (navbar.hasClass('scrolled')) {
          navbar.removeClass('scrolled sleep');
        }
      }
      if (st > 300) {
        if (!navbar.hasClass('awake')) {
          navbar.addClass('awake');
        }

        if (sd.length > 0) {
          sd.addClass('sleep');
        }
      }
      if (st < 330) {
        if (navbar.hasClass('awake')) {
          navbar.removeClass('awake');
          navbar.addClass('sleep');
        }
        if (sd.length > 0) {
          sd.removeClass('sleep');
        }
      }
    });
  };
  scrollWindow();

  // navigation
  var OnePageNav = function () {
    $(".smoothscroll[href^='#'], #ftco-nav ul li a[href^='#']").on(
      'click',
      function (e) {
        e.preventDefault();

        var hash = this.hash,
          navToggler = $('.navbar-toggler');
        $('html, body').animate(
          {
            scrollTop: $(hash).offset().top,
          },
          700,
          'easeInOutExpo',
          function () {
            window.location.hash = hash;
          }
        );

        if (navToggler.is(':visible')) {
          navToggler.click();
        }
      }
    );
    $('body').on('activate.bs.scrollspy', function () {
      // console.log('nice');
    });
  };
  OnePageNav();
})(jQuery);

'use strict';

$(document).ready(function () {

  //////////
  // Global variables
  //////////

  var _window = $(window);
  var _document = $(document);

  //////////
  // COMMON
  //////////

  // Prevent # behavior
  $('[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // Smoth scroll
  $('a[href^="#section"]').click(function () {
    var el = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $(el).offset().top }, 1000);
    return false;
  });

  // HEADER SCROLL
  if ($('.static-header').length == 0) {
    _window.scrolled(10, function () {
      // scrolled is a constructor for scroll delay listener
      var vScroll = _window.scrollTop();
      var header = $('.header').not('.header--static');
      var headerHeight = header.height();
      var heroHeight = $('.hero').outerHeight() - headerHeight;

      if (vScroll > headerHeight) {
        header.addClass('header--transformed');
      } else {
        header.removeClass('header--transformed');
      }

      if (vScroll > heroHeight) {
        header.addClass('header--fixed');
      } else {
        header.removeClass('header--fixed');
      }
    });
  }

  // hamburger
  $('.hamburger').on('click', function () {
    $(this).toggleClass('active');
    $('.mobile-navi').toggleClass('active');
  });

  // scrollbars
  $('.scrollbar-dynamic').scrollbar();

  // SET ACTIVE CLASS FOR HEADING
  $('.header__navi a').each(function (i, val) {
    if ($(val).attr('href') == window.location.pathname.substring(1)) {
      $(val).addClass('active');
    } else {
      $(val).removeClass('active');
    }
  });

  //////////
  // SLIDERS
  //////////

  $('.testimonials__slider').slick({
    autoplay: false,
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    fade: true
  });

  //////////
  // MODALS
  //////////
  // $('*[data-modal]').on('click', function(){
  //   // remove all active first
  //   $('.modal').removeClass('opened');
  //
  //   // find by id
  //   var target = $(this).data('modal');
  //   $('#'+target).addClass('opened');
  //
  //   window.location.hash = target;
  // });
  //
  // $('.modal__close').on('click', function(){
  //   $(this).closest('.modal').removeClass('opened');
  //   window.location.hash = "";
  // });
  //
  // // CHECK SAVED STATE
  // if(window.location.hash) {
  //   var hash = window.location.hash.substring(1);
  //   $('#'+hash).addClass('opened');
  // }


  // Magnific Popup
  // var startWindowScroll = 0;
  $('.js-popup').magnificPopup({
    type: 'inline',
    fixedContentPos: true,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    mainClass: 'popup-buble',
    callbacks: {
      beforeOpen: function beforeOpen() {
        // startWindowScroll = _window.scrollTop();
        // $('html').addClass('mfp-helper');
      },
      close: function close() {
        // $('html').removeClass('mfp-helper');
        // _window.scrollTop(startWindowScroll);
      }
    }
  });

  // Emultae modal clicks
  $('.modal__col').on('click', function () {
    $(this).find('.btn').click();
  });

  // HOW IT WORKS PAGE

  if (window.location.hash && $('.more-info').length > 0) {
    var hash = window.location.hash.substring(1).toLowerCase();
    toggleTab(hash);
  }

  // toggler
  $('.more-toggler__tab').on('click', function () {
    toggleTab($(this).data('section'));
  });

  function toggleTab(state) {
    // switch toggle
    $('.more-toggler__tab').each(function (i, val) {
      if ($(val).data('section') == state) {
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });

    // switch pannel
    $('.more-info').each(function (i, val) {
      if ($(val).data('section') == state) {
        $(val).addClass('active');
      } else {
        $(val).removeClass('active');
      }
    });

    // save state
    window.location.hash = state;
  }

  // Sticky Toggler
  _window.scrolled(10, function () {
    var stickyEl = $('.more-toggler');
    var windowBottomScroll = _window.scrollTop() + _window.height();
    var stopPoint = _document.height() - $('.more-hero').outerHeight();

    if (windowBottomScroll >= stopPoint + 35) {
      stickyEl.addClass('more-toggler--transformed');
    } else if (windowBottomScroll < stopPoint) {
      stickyEl.removeClass('more-toggler--transformed');
    }

    if (windowBottomScroll >= stopPoint + 100) {
      stickyEl.addClass('more-toggler--float');
    } else if (windowBottomScroll < stopPoint) {
      stickyEl.removeClass('more-toggler--float');
    }
  });

  // EXTRA

  // Masked input
  $("#date").mask("99/99/9999", { placeholder: "mm/dd/yyyy" });
  $("input[type='tel']").mask("999-999-9999");

  // DATEPICKER
  $('.js-datepicker').datepicker({
    language: 'en',
    range: true,
    multipleDatesSeparator: " - "
  });

  // RANGESLIDER
  var rangeSlider = document.querySelector('.js-rangeslider');

  if ($('.js-rangeslider').length > 0) {
    noUiSlider.create(rangeSlider, {
      start: [90, 120],
      connect: true,
      tooltips: true,
      step: 1,
      range: {
        'min': [80],
        'max': [120]
      }
    });

    // method to get current value
    // rangeSlider.noUiSlider.get();

    // docs on noUiSlider
    // https://refreshless.com/nouislider/slider-read-write/
  }

  // INPUTS FOCUS

  // Codedrops based - pure javascript
  (function () {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function () {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function () {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call(document.querySelectorAll('.ui-input input')).forEach(function (inputEl) {
      // in case the input is already filled..
      if (inputEl.value.trim() !== '') {
        classie.add(inputEl.parentNode, 'ui-input--focused');
      }

      // events:
      inputEl.addEventListener('focus', onInputFocus);
      inputEl.addEventListener('blur', onInputBlur);
    });

    function onInputFocus(ev) {
      classie.add(ev.target.parentNode, 'ui-input--focused');
    }

    function onInputBlur(ev) {
      if (ev.target.value.trim() === '') {
        classie.remove(ev.target.parentNode, 'ui-input--focused');
      }
    }
  })();
});
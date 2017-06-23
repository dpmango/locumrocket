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

  // Create pseudo links
  $('[data-link]').on('click', function () {
    var parsedLink = $(this).data('link');
    if (parsedLink.length >= 2) {
      window.location.href = parsedLink;
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
  // $('.modal__col').on('click', function(){
  //   $(this).find('.btn').click();
  // });


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

  /////////////////
  // DASHBOARD PAGE
  ////////////////

  // dashboard header toggable
  $('.header__user__clickable').on('click', function () {
    $(this).parent().toggleClass('active');
  });

  // alerts
  var saveAlertTogglerState = '';
  $('.alerts__toggler').on('click', function () {
    var alerts = $(this).parent().find('.js-toggableAlert').toggleClass('visible');
    if ($(this).data('hidden') == '1') {
      saveAlertTogglerState = $(this).find('a').text();
      $(this).find('a').text('collapse alerts');
      $(this).data('hidden', '0');
    } else {
      $(this).find('a').text(saveAlertTogglerState);
      $(this).data('hidden', '1');
    }
  });

  $('.alert .icon-close').on('click', function () {
    $(this).parent().fadeOut();
  });

  // DASHBOARD SEARCH
  $('.js-toggleSearchFilters').on('click', function () {
    $(this).toggleClass('active');
    $(this).closest('.d-search').find('.d-search__collapsable').slideToggle();
  });

  // SORTABLE TOGGLER
  $('.sortable__filter > span').on('click', function () {
    $(this).closest('.sortable').toggleClass('active');
  });

  $('.sortable__dropdown span').on('click', function () {
    $(this).closest('.sortable').removeClass('active');
    var selectedVal = $(this).data('val');
    console.log(selectedVal);

    $(this).closest('.sortable').find('.sortable__filter > span').text(selectedVal);
  });

  // Universal toggler
  var saveTogglerStateText = '';
  $('.show-more').on('click', function (e) {
    if ($(this).closest('.js-showMoreList').is('.js-showMoreList')) {
      $(this).closest('.js-showMoreList').toggleClass('active').find('div[data-visible="0"]').slideToggle();
      if ($(this).data('hidden') == '1') {
        saveTogglerStateText = $(this).find('a, span').text();
        $(this).find('a, span').text($(this).data('alttext'));
        $(this).data('hidden', '0');
      } else {
        $(this).find('a, span').text(saveTogglerStateText);
        $(this).data('hidden', '1');
      }
    } else {
      // continue
    }
  });

  /////////////////
  // MESSAGES PAGE
  ////////////////
  $('.messages__scrollable').scrolled(15, function () {
    $(this).find('.messages__dialog__day').each(function (i, val) {
      if ($(val).offset().top < 165) {
        $(val).addClass('sticky');
      } else {
        $(val).removeClass('sticky');
      }
    });
  });

  // DASHBOARD HELPERS

  $('.h-feedback__title').on('click', function () {
    $(this).parent().toggleClass('active');
  });

  // Masked input
  $("#date").mask("99/99/9999", { placeholder: "mm/dd/yyyy" });
  $("input[type='tel']").mask("999-999-9999");

  // DATEPICKER
  $('.js-datepicker').datepicker({
    language: 'en',
    range: true,
    multipleDatesSeparator: " - "
  });

  // BOOTSTRAP TOOLTIP
  $('[data-toggle="tooltip"]').tooltip

  // custom selects
  ();$('.ui-select__visible').on('click', function (e) {
    var that = this;
    // hide parents
    $(this).parent().parent().parent().find('.ui-select__visible').each(function (i, val) {
      if (!$(val).is($(that))) {
        $(val).parent().removeClass('active');
      }
    });

    $(this).parent().toggleClass('active');
  });

  $('.ui-select__dropdown span').on('click', function () {
    // parse value and toggle active
    var value = $(this).data('value');
    if (value) {
      $(this).siblings().removeClass('active');
      $(this).addClass('active');

      // set visible
      $(this).closest('.ui-select').removeClass('active');
      $(this).closest('.ui-select').find('input').val(value).trigger('change');

      $(this).closest('.ui-select').find('.ui-select__visible span').text(value);
    }
  });

  // handle outside click
  $(document).click(function (e) {
    var container = new Array();
    container.push($('.ui-select'));

    $.each(container, function (key, value) {
      if (!$(value).is(e.target) && $(value).has(e.target).length === 0) {
        $(value).removeClass('active');
      }
    });
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

  // FILE INPUT
  var inputs = document.querySelectorAll('.ui-file__input');
  Array.prototype.forEach.call(inputs, function (input) {
    var label = input.nextElementSibling,
        labelVal = label.innerHTML;

    input.addEventListener('change', function (e) {
      var fileName = '';
      if (this.files && this.files.length > 1) fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);else fileName = e.target.value.split('\\').pop();

      if (fileName) label.querySelector('span').innerHTML = fileName;else label.innerHTML = labelVal;
    });
  });

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
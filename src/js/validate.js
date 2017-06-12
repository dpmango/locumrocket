'use strict';

$(document).ready(function () {
  ////////////////
  // FORM VALIDATIONS
  ////////////////

  // jQuery validate plugin
  // https://jqueryvalidation.org


  // GENERIC FUNCTIONS
  ////////////////////

  var noPlacement = function noPlacement(error, element) {
    return true;
  };

  var validateErrorPlacement = function validateErrorPlacement(error, element) {
    error.addClass('ui-input__validation');
    error.appendTo(element.parent("div"));
  };
  var validateHighlight = function validateHighlight(element) {
    $(element).parent('div').addClass("has-error");
  };
  var validateUnhighlight = function validateUnhighlight(element) {
    $(element).parent('div').removeClass("has-error");
  };
  var validateSubmitHandler = function validateSubmitHandler(form) {
    $(form).addClass('loading');
    $.ajax({
      type: "POST",
      url: $(form).attr('action'),
      data: $(form).serialize(),
      success: function success(response) {
        $(form).removeClass('loading');
        var data = $.parseJSON(response);
        if (data.status == 'success') {
          // do something I can't test
        } else {
          $(form).find('[data-error]').html(data.message).show();
        }
      }
    });
  };

  var validatePhone = {
    required: true,
    normalizer: function normalizer(value) {
      var PHONE_MASK = 'XXX-XXX-XXXX';
      if (!value || value === PHONE_MASK) {
        return value;
      } else {
        return value.replace(/[^\d]/g, '');
      }
    },
    minlength: 10,
    digits: true

    ////////
    // FORMS


    /////////////////////
    // REGISTRATION FORM
    ////////////////////
    // $(".js-registration-form").validate({
    //   errorPlacement: validateErrorPlacement,
    //   highlight: validateHighlight,
    //   unhighlight: validateUnhighlight,
    //   submitHandler: validateSubmitHandler,
    //   rules: {
    //     last_name: "required",
    //     first_name: "required",
    //     email: {
    //       required: true,
    //       email: true
    //     },
    //     password: {
    //       required: true,
    //       minlength: 6,
    //     }
    //     // phone: validatePhone
    //   },
    //   messages: {
    //     last_name: "Заполните это поле",
    //     first_name: "Заполните это поле",
    //     email: {
    //         required: "Заполните это поле",
    //         email: "Email содержит неправильный формат"
    //     },
    //     password: {
    //         required: "Заполните это поле",
    //         email: "Пароль мимимум 6 символов"
    //     },
    //     // phone: {
    //     //     required: "Заполните это поле",
    //     //     minlength: "Введите корректный телефон"
    //     // }
    //   }
    // });


    /////////////////////
    // REGISTRATION FORM
    ////////////////////
  };$(".js-login-form").validate({
    errorPlacement: noPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true,
        minlength: 6
      }
    },
    messages: {
      email: {
        required: "Please fill the email",
        email: "Email is not valid"
      },
      password: {
        required: "Please fill the password",
        email: "Password should be at least 6 symbols"
      }
    }
  });

  /////////////////////
  // RECOVER FORM
  ////////////////////
  $(".js-recover-form").validate({
    errorPlacement: noPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      email: {
        required: true,
        email: true
      }
    }
  });

  /////////////////////
  // BETA SIGNUP PRO
  ////////////////////
  $(".js-regBetaPro-form").validate({
    errorPlacement: noPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      email: {
        required: true,
        email: true
      }
    }
  });

  /////////////////////
  // BETA SIGNUP FACILITY
  ////////////////////
  $(".js-regBetaFacility-form").validate({
    errorPlacement: noPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      email: {
        required: true,
        email: true
      }
    }
  });

  /////////////////////
  // CONTACT FORM
  ////////////////////
  $(".js-contact-form").validate({
    errorPlacement: noPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      email: {
        required: true,
        email: true
      },
      name: {
        required: true
      },
      text: {
        required: true
      }
    }
  });

  /////////////////////
  // DEMO FORM
  ////////////////////
  $(".js-demo-form").validate({
    errorPlacement: noPlacement,
    highlight: validateHighlight,
    unhighlight: validateUnhighlight,
    submitHandler: validateSubmitHandler,
    rules: {
      email: {
        required: true,
        email: true
      },
      first_name: {
        required: true
      },
      phone: validatePhone
    }
  });
});
function check_email_address(email) {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// ********************* VARIABLES ********************* //

$(document).ready(function(){



// ********************* MOBILE CHECK ********************* //
function detectmob() {                        // function to test if on a mobile device
  var $check = $('#width-check').css('z-index');
  if(!!navigator.userAgent.match(/iPad|iPhone|Android|BlackBerry|Windows Phone|webOS/i)) {
    return true;
  } else if($check != 0) {
    return true;
  } else {
    return false;
  }
}
function setMobile(){
  if(detectmob() || window.innerWidth <= 900){
    $('body').addClass('mobile');
  } else {
    $('body').removeClass('mobile');
  }
}
setMobile();

// ********************* BG VIDEO AUTOPLAY ********************* //
(function(){
  var bgvid = document.getElementById('bgvid');
  if (bgvid) {
    bgvid.muted = true;
    var playPromise = bgvid.play();
    if (playPromise !== undefined) { playPromise.catch(function(){}); }
  }
})();

// ********************* FANCY BOX ********************* //
$(".fancybox").fancybox({
    fitToView   : true,
    autoSize    : true,
    closeClick  : false,
    openEffect  : 'none',
    closeEffect : 'none'
});
$(".fancybox-video").fancybox({
    width           : '75%',
    height          : '75%',
    autoScale       : true,
    transitionIn    : 'none',
    transitionOut   : 'none',
    type            : 'iframe'
});

var autoplayHero = function(){ 
  $("#hero .fancybox-video").clone(true).appendTo("#hero").addClass("no-autoplay");
  var url = $('.fancybox-video.no-autoplay').attr('href');
  url = url.replace('autoplay=1', 'autoplay=0');
  url = url.replace('showinfo=0', 'showinfo=1');
  $('.fancybox-video.no-autoplay').attr('href', url);
  $(".fancybox-video.no-autoplay").trigger('click');
}
//autoplayHero();

// ********************* BACKGROUND IMAGES ********************* //
// var bgImgs = function(){
//   $('.img-bg').each(function(){
//     $(this).append('<div class="bg"></div>')
//     var $url = $(this).find('img').attr('src');
//     var $bg = $(this).find('.bg');
//     $bg.css('background-image','url('+$url+')');
//   });
// }
// bgImgs();

// ********************* SCROLL FUNCTIONS FOR FADE IN ********************* //
// $(window).scroll( function () {
//     var $window = $(this).scrollTop();
//     var $investors = $('#investors').offset().top - 400;
//     var $scrollcheck = 0;

//     if($window >= $investors){
//       if($scrollcheck == 0) {
//         $('#investors .about .hold, #investors .investors .hold, #investors .news .hold').addClass('fadeInUp');
//         $scrollcheck = 1;
//       }
//     }
// });

// ********************* SCROLL FUNCTION FOR SUBSCRIBE ********************* //
$(".sub-link").on('click touch', function(e) { console.log('hi');
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $("#subscribe").offset().top - 70
    }, 1500);
});



// ********************* MENU FUNCTIONS ********************* //
var setupDropDowns = function(){                // Drops down the sub nav and adds the hover effect
  $('#head-hold li.dropdown').mouseover(function() {
    $('#head-hold nav.navigation').addClass('open');
    $(this).addClass('open');
    var $left = $(this).offset().left + 'px';
    $('#nav-hover').css('left',$left);
    var $width = $(this).outerWidth() + 'px';
    $('#nav-hover').css('width',$width);
  });  
  $('#head-hold li.dropdown').mouseleave(function() {  
    $('#head-hold nav.navigation').removeClass('open');
    $(this).removeClass('open');
  }); 
}
setupDropDowns();

$('.menu-icon').on('click touch', function(){   // mobilemenu icon click actions
  if($(this).hasClass('open')){
    setTimeout(function(){closeMobileNav();},500);
  }
  $(this).toggleClass('open');  
  $('#mobile-menu-hold').toggleClass('open');
});

var closeMobileNav = function(){
  $('.mobile-menu a').each(function(){
    $(this).removeClass('active');
  });
  $('.mobile-menu ul').each(function(){
    $(this).attr('style','');
  });
}

var add_mobile_link_handlers = function() {
  var parent_menu_item = $('.mobile-menu a.has-submenu');
  var sub_menu_item = $('.mobile-menu a.sub.has-submenu');
  $(parent_menu_item).on('click touch', function(e) {
    e.preventDefault()
    if ($(this).hasClass("active")) var parent_selected = true;
    if($(this).hasClass('sub')){
      $(sub_menu_item).removeClass('active').siblings('ul').slideUp(300);
    } else {
      $(parent_menu_item).removeClass('active').siblings('ul').slideUp(300); 
    }     
    if (!parent_selected) {
      $(this).siblings('ul').slideDown(300);
      $(this).addClass('active');
    }
  });
}
add_mobile_link_handlers();

// //////////////////////////////////////////////////
// ////////////// Hubspot Integration  //////////////
// //////////////////////////////////////////////////
// var $ipAddress;
// jQuery.ajax({
//     'type': "POST",
//     'url': $path + "getIP.php",
//     'success': function (data) {
//         $ipAddress = data;
//     }
// });
// var sendContactForm = function(name,email,phone,message) {
//   var $portal_id = '2878115';
//   var $form_guid = '30bc96eb-2c54-4174-8ecd-114a682e622f';
//   var $cookie = jQuery.cookie("hubspotutk");
//   $ipAddress = $ipAddress;
//   var $pageUrl = window.location.href;
//   var $pageName = document.title;
//   var $parameters = 'firstname='+encodeURIComponent(name);
//   $parameters += '&email='+encodeURIComponent(email);
//   $parameters += '&phone='+encodeURIComponent(phone);
//   $parameters += '&message='+encodeURIComponent(message);
//   var $parameters2 = '&hs_context={"hutk":"'+$cookie+'","ipAddress":"'+$ipAddress+'","pageUrl":"'+encodeURIComponent($pageUrl)+'","pageName":"'+encodeURIComponent($pageName)+'"}';
//   var $url = "https://forms.hubspot.com/uploads/form/v2/"+$portal_id+"/"+$form_guid;
//   jQuery.post($path + 'hubspot.php', {url: $url, parameters: $parameters, parameters2: $parameters2}, function( data ) { console.log( "Data Loaded: " + data )});
// }


// ********************* EMAIL SIGNUP ********************* //
  //Error checking
  $('.required input').focusout(function() {
    if ($(this).val() == "") {
      $(this).parent().addClass("error");
      $(this).parent().addClass("show-tooltip").delay(5000).queue(function(next){
        $(this).removeClass("show-tooltip");next();
      });
    } else {
      if ($(this).parent().hasClass("signup-email")) {
        if (!check_email_address($(this).val())) {
          $(this).parent().addClass("error");
          $(this).parent().addClass("show-tooltip").delay(5000).queue(function(next){
            $(this).removeClass("show-tooltip");next();
          });
        } else {
          $(this).parent().removeClass('error');
        }
      } else {
          $(this).parent().removeClass('error');
      }
    }
  });

   $('form.signup').on('click touch', function(){
    $('.grecaptcha-badge').addClass('show');
  });
   $('#consent-modal .close, #consent-modal button').on('click touch',function(){
  $('#consent-modal').removeClass('show');
  if($('#consent-modal input[type="checkbox"]').is(":checked")) {$('form.signup').submit();}
});

  $('form.signup').submit ( function() {

      // SINGLE OPT-IN CODE
    if($('#consent-modal input[type="checkbox"]').is(":checked")) {
      $consent = true;
    } else {
      $consent = false;
    }

    if(!$consent) {
    $('#consent-modal').addClass('show');

    } else {

    var $message = $(this).next('.signup-message'); // Variable for selecting appropriate signup message
    var $signuptext = $('#signup-text');
    $message.empty().hide();
    var $this = $(this);

     grecaptcha.ready(function() {                                                  // Call the V3 Recaptcha system
      grecaptcha.execute($recaptcha_site_key, {action: 'submit'}).then(function(token) {
        var recaptchaResponse1 = document.getElementById('recaptchaResponse1');    // Call this on hidden recpatcha element in the form
        recaptchaResponse1.value = token;

        var $form = $this,
        formData = $form.serialize(),
        formArray = $form.serializeArray(),
        formUrl = $form.attr('action'),
        formMethod = $form.attr('method'),
        responseMsg = $message;

        $.ajax({
          url: formUrl,
          type: formMethod,
          data: formData,

          success:function(data){
            
            var responseData = jQuery.parseJSON(data);
            switch(responseData.SUCCESS){
            case 'false':
              $form.show();
              responseMsg.empty().hide().fadeIn('slow').append(responseData.CONFIRMATION);
              break;
            case 'true':
              $form.hide();
              responseMsg.empty().hide().fadeIn('slow').append(responseData.CONFIRMATION);
               
              break;
            }
          }
        })
      });
    });
   }
   return false;
  });
  

// Homepage Popup Section Signup

$('form#popup-form').on('click touch', function(){
    $('.grecaptcha-badge').addClass('show');
  });
      $('form#popup-form').submit ( function() {
    var $signuptext = $('.featherlight h3');
    var $message = $(this).next('.message'); // Variable for selecting appropriate signup message
    $message.empty().hide();
var $this = $(this);

     grecaptcha.ready(function() {                                                  // Call the V3 Recaptcha system
      grecaptcha.execute($recaptcha_site_key, {action: 'submit'}).then(function(token) {
        var recaptchaResponse2 = document.getElementById('recaptchaResponse2');    // Call this on hidden recpatcha element in the form
        recaptchaResponse2.value = token;

        var $form = $this,
        formData = $form.serialize(),
        formArray = $form.serializeArray(),
        formUrl = $form.attr('action'),
        formMethod = $form.attr('method'),
        responseMsg = $message;

        $.ajax({
          url: formUrl,
          type: formMethod,
          data: formData,

          success:function(data){
            
            var responseData = jQuery.parseJSON(data);
            switch(responseData.SUCCESS){
            case 'false':
              $form.show();
              responseMsg.empty().hide().fadeIn('slow').append(responseData.CONFIRMATION);
              break;
            case 'true':
              $form.hide();
              responseMsg.empty().hide().fadeIn('slow').append(responseData.CONFIRMATION);
               
              break;
            }
          }
        })
      });
    });
   return false;
  });

// Homepage Featured Section Signup
    $('form#featured-form').on('click touch', function(){
      $('.grecaptcha-badge').addClass('show');
    });

    $('#consent-modal .close, #consent-modal button').on('click touch',function(){
      $('#consent-modal').removeClass('show');
      if($('#consent-modal input[type="checkbox"]').is(":checked")) {$('form#featured-form').submit();}
    });

    $('form#featured-form').submit ( function() {

      // SINGLE OPT-IN CODE
      if($('#consent-modal input[type="checkbox"]').is(":checked")) {
        $consent = true;
      } else {
        $consent = false;
      }


      if(!$consent) {
        $('#consent-modal').addClass('show');
      } else {
    var $signuptext = $('.featured-form h3');
    var $message = $(this).next('.message'); // Variable for selecting appropriate signup message
    $message.empty().hide();
var $this = $(this);

     grecaptcha.ready(function() {                                                  // Call the V3 Recaptcha system
      grecaptcha.execute($recaptcha_site_key, {action: 'submit'}).then(function(token) {
        var recaptchaResponse3 = document.getElementById('recaptchaResponse3');    // Call this on hidden recpatcha element in the form
        recaptchaResponse3.value = token;

        var $form = $this,
        formData = $form.serialize(),
        formArray = $form.serializeArray(),
        formUrl = $form.attr('action'),
        formMethod = $form.attr('method'),
        responseMsg = $message;

        $.ajax({
          url: formUrl,
          type: formMethod,
          data: formData,

          success:function(data){
            
            var responseData = jQuery.parseJSON(data);
            switch(responseData.SUCCESS){
            case 'false':
              $form.show();
              responseMsg.empty().hide().fadeIn('slow').append(responseData.CONFIRMATION);
              break;
            case 'true':
              $form.hide();
              responseMsg.empty().hide().fadeIn('slow').append(responseData.CONFIRMATION);
               
              break;
            }
          }
        })
      });
    });
   }
   return false;
  });

// ********************* RESIZE FUNCTIONS ********************* //
var resizeRotate = function(){
  setMobile();
}

// Mobile chrome resizes on scroll, add width check to fix
  var width = $(window).width();
  var height = $(window).height();
  $(window).resize(function() {
    if($(window).width() != width || $(window).height() != height){
      setTimeout(function(){resizeRotate();},250);
    }
  });

  // Device orintation change check
  if(detectmob()) {
    $( window ).on( "orientationchange", function( event ) {
      resizeRotate();
    });
  }

});
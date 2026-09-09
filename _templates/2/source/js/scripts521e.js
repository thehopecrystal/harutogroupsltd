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
  if(detectmob()){
    $('body').addClass('mobile');
  } else {
    $('body').removeClass('mobile');
  }
}
setMobile();

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

// ********************* Bio pics ********************* //
var bioImgs = function(){
  $('.bio-image').each(function(){
    var $url = $(this).find('img').attr('src');
    $(this).css('background-image','url('+$url+')');
  });
}
bioImgs();

// ********************* EXPAND CONTENT ********************* //
$('.expand').click(function(e) { 
  var originalHeight = $(this).siblings().css('min-height');
  var autoHeight = $(this).siblings().get(0).scrollHeight;
  
  if ($(this).siblings().hasClass('active')) {
    $(this).siblings().removeClass('active').animate( { height:originalHeight }, { queue:false, duration:500 });
    $(this).text("Read More [ + ]");
  } else {
    $(this).siblings().addClass('active').animate( { height:autoHeight }, { queue:false, duration:500 });
    $(this).text("Read Less [ - ]");
  }
});

// ********************* Responsive Content Table Adjustment ********************* //
var tableFix = function(){
  $('#content table, #project-table').each(function(){
    if(!$(this).hasClass('nofix')){
      $(this).wrap("<div class='overflow'></div>");
    }
  });

  $('div.overflow').each(function(){
    $(this).after('<div class="instruction"><i class="fa fa-arrows-h" aria-hidden="true"></i> Scroll to the right to see the table data.</div>');
  });
}
tableFix();
  var tableSize = function(){
    $('#content div.overflow, body.str-projects-overview div.overflow').each(function(){
      var $width = $(this).width();
      var $scrollWidth = this.scrollWidth;
      if ($scrollWidth > $width + 2) { $(this).next('.instruction').addClass('show'); }
      else {$(this).next('.instruction').removeClass('show');}
    });
  }
  tableSize();




// ********************* TABS ********************* //
var setUpTabs = function(max, $tabs) {              // Pass the maximum number of tabs and the tab container
  var $archive = '<li class="has-sub">Archive<ul class="sub-tabs"></ul></li>';
  var $maxTabs = max;
  $tabs.each(function(){
      $this = $(this);
      var $maxCount = 0;
      $this.find('li').each(function(){$maxCount++;});      
      $this.prepend('<select></select>');
      var $count = 1;
      var $contentcount = 1;      
      $this.find('li').each(function(){
        if($count == 1) $(this).addClass('active');
        if(($count == $maxTabs) && ($maxTabs != $maxCount)){
          $(this).before($archive);
        }
        if(($count >= $maxTabs) && ($maxTabs != $maxCount)) {
          var $html = $(this).html();
          $(this).attr('data-tab','tab'+$count);            
          var $move = $(this).detach();
          $this.find('ul.sub-tabs').append($move);
          var $option = '<option data-tab="tab'+$count+'">'+$html+'</option>';
          $this.find('select').append($option);
          $count++;
        } else {
          var $html = $(this).html();
          $(this).attr('data-tab','tab'+$count);
          var $option = '<option data-tab="tab'+$count+'">'+$html+'</option>';
          $this.find('select').append($option);
          $count++;  
        }         
      });
      $this.find('div.hold').each(function(){
        if($contentcount == 1) $(this).addClass('active');
        $(this).addClass('tab'+$contentcount);
        $contentcount++;          
      });      
  }); 
}
setUpTabs(4, $('div.tabs.news'));                 // Tabs for the news page
setUpTabs(4, $('div.tabs.financials'));           // Tabs for the financials page
setUpTabs(4, $('div.tabs.featured-video'));                 // Tabs for the featured page
setUpTabs(4, $('div.tabs.shareholder-meetings'));                 // Tabs for the shareholder meetings
$(".tabs li").not('.has-sub').click(function (e) {
  e.preventDefault();
  e.stopPropagation();
  $('div.tabs li, div.tabs div.hold').removeClass('active');
  var $class = $(this).data('tab');
  $(this).addClass('active');
  $('div.tabs div.hold.'+$class).addClass('active');
  $('div.tabs li.has-sub:has(li.active)').addClass('active');
});
$("div.tabs select").change(function() {
  $('div.tabs div.hold').removeClass('active');
  var $class = $(this).find(':selected').data('tab');
  $('div.tabs div.hold.'+$class).addClass('active');
});
// IPAD DROPDOWN FIX
$("div.tabs li.has-sub").on('touchstart',function () {                // Corrects tab drop down on ipad to work like android
  if (detectmob()) {
    $('body').css('cursor','pointer');
  }
});

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
        var recaptchaResponse1 = document.getElementById('recaptchaResponse1');
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


// Homepage Featured Section Signup

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

// ********************* RESIZE FUNCTIONS ********************* //
var resizeRotate = function(){
  setMobile();
  tableSize();
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
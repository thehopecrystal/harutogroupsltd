$(document).ready(function() {

  if ($('#error-message-box').html() != '') {
    $('body').addClass('ri-error');
    // $('body.ri-error ').css({"padding-top":$('#error-message-box').outerHeight()-1});
  }

  $('#request-info-form').on('click touch', function(){
    $('.grecaptcha-badge').addClass('show');
    grecaptcha.ready(function() {
      grecaptcha.execute($recaptcha_site_key, {action: 'submit'}).then(function(token) {
        var request_info_recaptcha = document.getElementById('request_info_recaptcha');  // Call this on hidden recpatcha element in the form
        request_info_recaptcha.value = token;
      });
    });
  });
  
});
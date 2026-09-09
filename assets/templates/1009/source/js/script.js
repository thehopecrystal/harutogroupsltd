$(document).ready(function () {

	var hideShowPhotoPreviewHandler = function() {
		$(".photo-gallery-right__item").on("click", function() {
			$('.photo-gallery-right__item').removeClass('active');
			$('.preview-wrapper').removeClass('active');
			$(this).addClass('active');
			var $id = $(this).data('index');
			$('.preview-wrapper[data-index='+$id+']').addClass('active');
		 //  var links = document.querySelectorAll('.preview-wrapper__thumbnail a');
			// for(var i = 0; i < links.length; i++){
			//   console.log(links[i].href);
			// };
		 //  $('.preview-wrapper__thumbnail > a[href*="href"]').parent().parent().addClass('active');
		});
  }

  var initializePhotoGallery = function() {
	  $('.bmcl-photo-gallery-1').each(function() {
		  $(this).find('.photo-gallery-right__item:first-of-type').addClass('active');
		  $(this).find('.preview-wrapper:first-of-type').addClass('active');
		});
  }

	if ($('.bmcl-photo-gallery-1').length > 0) { 
		initializePhotoGallery();
		hideShowPhotoPreviewHandler();
	}

	handleMediaQueryClasses();
});

var handleMediaQueryClasses = function() {
	if ($('.bmcl-photo-gallery-1').outerWidth() < 855) {
		$('.bmcl-photo-gallery-1').each(function() {
      $(this).addClass('is-mobile');
		});
   } else {
   $('.bmcl-photo-gallery-1').each(function() {
      $(this).removeClass('is-mobile');
		});
	}
}

// Resize Functions to assist Media Queries
$(window).resize(function() {
	handleMediaQueryClasses();
});
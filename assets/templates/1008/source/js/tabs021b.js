$(document).ready(function(){

  // var refreshChart = function(e) {                                      // Re-readies the stock chart within the clicked tab
  //   if($('div.highStock').length) {
  //     readyStockChart(e.find('div.highStock:first').attr('id'));
  //   }
  // }
  
  var changeTab = function ($el) {
    $parent = $el.parents('.bmcl-tabs-1 .tabs-1');
    $parent.find('.nav-tabs li, .mobile-tabs option').removeClass('current').removeAttr('selected');
    $parent.children('.tab-content').removeClass('active');
    $parent.find('#tab-' + $el.data('id')).addClass('active');
    $parent.find("[data-id='" + $el.data('id') + "']").addClass('current').attr('selected','selected');

  };
  $(".bmcl-tabs-1 .nav-tabs li, .bmcl-tabs-1 .subnav-tabs li").click(function (e) { 
    if (!$(this).hasClass('ignore')) {
      e.preventDefault();
      e.stopPropagation();
      changeTab($(this));
    }
  });
  $('.bmcl-tabs-1 .tabs-1').each(function(){
    if(!$(this).hasClass('ran')){
      $tabs = $(this);
      $tabs.addClass('ran');
      $tabs.find(".mobile-tabs").prepend("<select>");

      $tabs.find('li[data-id]').each(function() {
       var el = $(this);
       $("<option />", {
          "value"   : el.attr("data-id"),
          "data-id" : el.attr("data-id"),
          "text"    : el.text()
       }).appendTo($tabs.find("select"));
      });

      //Change tab from mobile select
      $(".bmcl-tabs-1 .tabs-1 select").change(function() {
        changeTab($(this).find(':selected'));
      });
      //Control tab using a separate element
      $(".bmcl-tabs-1 .changetab").click(function (e) { 
        changeTab($(".bmcl-tabs-1 .tabs-1").find('li[data-id="'+$(this).data('id')+'"]'));
      });
      // Add wrapper to select for icon placement
      $(".bmcl-tabs-1 .tabs-1 select").wrap('<div class="select-wrapper">');
    }
  });


    // navigate tab from url
    const updateTab = function () {
      let tabId = window.location.hash.slice(1);
      if (tabId) { changeTab($(".bmcl-tabs-1 .tabs-1").find('li[data-id=' + tabId + ']')); }
    };
    updateTab();
    $(".bmcl-tabs-1 .tabs-1 .tab-content a").click(function () { 
      let results = $(this).attr('href').split('#');
      if ( results[0] == window.location.href || results[0] == '' && results[1] != '' ) {
        changeTab($(".bmcl-tabs-1 .tabs-1").find('li[data-id=' + results[1] + ']'));
        $('html, body').animate({
          scrollTop: $(".bmcl-tabs-1 .tabs-1").offset().top - 200
        }, 400);
      }
    });


});
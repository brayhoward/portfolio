var time;
$(document).ready(function(){
  time = new Date;
})

function stopAnimation() {
  $(".down-arrow").removeClass("bounce")
}


$(window).scroll(function(){
  if ( (new Date() - time) < 4000 ){
    return;
  }
  else{
    stopAnimation();
  }
});

$(function() {
  $('a[href*=#]:not([href=#myCarousel])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
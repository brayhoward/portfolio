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
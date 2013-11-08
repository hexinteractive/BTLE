

$(document).ready(function(){

  var bt1 = $('#bt1');//.position();
  var p1 = $('#p1');//.position();


  function outOfRange(lower, upper, point){
    // calculates how far out of range a point is.
    // negative values are less than the low-end of the range.
    // positive value are greater than the high-end of the range.
    // zero value is within range.
    return ( (lower - Math.min(lower, point) )*-1) || Math.abs( (upper - Math.max(upper, point) ) );
  }

  /* calculate and return the dimensions of the target element */
  function getDimensions($target){
    // var offset = $target.offset();
    var position = $target.position();
    var dim = {
                'left':position.left,
                'top':position.top,
                'outerWidth':$target.outerWidth(),
                'outerHeight':$target.outerHeight()
              };
    return dim;
  }

  function checkProximity($target){
    // var mouse =  $('body').data('decayData').mouse;

    var rat = bt1.position();
    var mouse = {
      'x': rat.left,
      'y': rat.top

    };
    // var dim = $target.data('decayData').dimensions;
    var dim = getDimensions($target);
    var mx = outOfRange(dim.left, (dim.left + dim.outerWidth ),mouse.x);
    var my = outOfRange(dim.top, (dim.top + dim.outerHeight ), mouse.y);
    /* calculates the mouse's distance from the closest side or corner using the Pythagorean theorem */
    return Math.sqrt( (mx*mx) + (my*my) );/* according to some interwebs x*x may be faster than Math.pow(x,2)-i didnt test */
  }


function work (argument) {
  var delta = checkProximity(p1);

  if(delta <= 200) {
    $('#lamp1').addClass('on');
  } else {
    $('#lamp1').removeClass('on');
  }
  console.log('delta: ', delta);
}

setInterval(work,1000);

function dragFace(e,face) {
  var offset = p1.offsetParent().position();
  var radius = p1.outerWidth()/2;
  p1.css({'top':e.pageY - offset.top - radius,'left':e.pageX - offset.left - radius});
}

$('body').on('mousedown',function(e){
  if(e.target == p1[0]) {
    console.log('p1');


    $('body').on('mousemove',dragFace)
             .one('mouseup', function(e) {
      // body...
      $('body').unbind('mousemove',dragFace);
    });

  }

});



});//end of ready









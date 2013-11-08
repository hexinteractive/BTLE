

    $('document').ready(function(){
        var person1InZone = false;
        var person2InZone = false;
        var dog1InZone = false;
        var bt1 = $('#bt1');
        var btRadius = 200;
        var personRadius = 25;

        function isPersonInZone ( ui ) {


            var bt1Offset = bt1.offset();
            // console.log('bt1.offset: ', bt1.offset());

            var personCenterX = ui.offset.left + personRadius;
            var personCenterY = ui.offset.top + personRadius;

            var dist = distance(bt1Offset.left, bt1Offset.top, personCenterX, personCenterY);
            // console.log('dist: ', dist);
            if (dist < (btRadius + personRadius)) {
                return true;
            }

            return false;
        }

        function distance (pointAX, pointAY, pointBX, pointBY) {
            return Math.sqrt(Math.pow(pointBX - pointAX, 2) + Math.pow(pointBY - pointAY, 2));
        }

        function determineLightState() {
          if (person1InZone && person2InZone) {
              // $("#light").css("background", "yellow");
              $('#tLamp').addClass('on');
          } else {
              // $("#light").css("background", "grey");
              $('#tLamp').removeClass('on');
          }
          var p1InZone = person1InZone ? 1 : 0;
          var p2InZone = person2InZone ? 2 : 0;
          var d1InZone = dog1InZone ? 4 : 0;
          var peopleInZone = p1InZone + p2InZone + d1InZone;

          $('.lamp').removeClass('on on1 on2 on3 on4 on5');

          switch(peopleInZone) {
            case 1:
            case 5:
              $('#tLamp, #flamp').addClass('on on1');
            break;
            case 2:
            case 6:
              $('#tLamp').addClass('on on2');
            break;
            case 3:
            case 7:
              $('#fLamp').addClass('on on3');
            break;
            case 4:
              $('#fLamp').addClass('on on4');
            break;
          }

        }



//+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x



    $( "#p1" ).draggable({
      drag: function( event, ui ) {
          person1InZone = isPersonInZone ( ui );
          determineLightState();
      }
    });
    $( "#p2" ).draggable({
      drag: function( event, ui ) {
          person2InZone = isPersonInZone ( ui );
          determineLightState();
      }
    });

    $( "#d1" ).draggable({
      drag: function( event, ui ) {
          dog1InZone = isPersonInZone ( ui );
          determineLightState();
      }
    });

    $('#bt1').draggable({drag: function( event, ui ) {}});
    $('.lamp, #sofa, #tv, #table').draggable({drag: function( event, ui ) {}});







});
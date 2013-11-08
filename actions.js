

    $('document').ready(function(){
        var bt1 = $('#bt1');
        var person1InZone1 = false;
        var person2InZone1 = false;
        var dog1InZone1 = false;

        var bt2 = $('#bt2');
        var person1InZone2 = false;
        var person2InZone2 = false;
        var dog1InZone2 = false;

        var tvPower = false;

        var btRadius = 200;
        var personRadius = 25;

        function isPersonInZone1 ( ui ) {
            var bt1Offset = bt1.offset();
            var personCenterX = ui.offset.left + personRadius;
            var personCenterY = ui.offset.top + personRadius;
            var dist = distance(bt1Offset.left, bt1Offset.top, personCenterX, personCenterY);
            if (dist < (btRadius + personRadius)) {
                return true;
            }
            return false;
        }

        function isPersonInZone2 ( ui ) {
            var bt2Offset = bt2.offset();
            var personCenterX = ui.offset.left + personRadius;
            var personCenterY = ui.offset.top + personRadius;
            var dist = distance(bt2Offset.left, bt2Offset.top, personCenterX, personCenterY);
            if (dist < (btRadius + personRadius)) {
                return true;
            }
            return false;
        }

        function distance (pointAX, pointAY, pointBX, pointBY) {
            return Math.sqrt(Math.pow(pointBX - pointAX, 2) + Math.pow(pointBY - pointAY, 2));
        }

        function determineLightState() {
          var p1InZone1 = person1InZone1 ? 1 : 0;
          var p2InZone1 = person2InZone1 ? 2 : 0;
          var d1InZone1 = dog1InZone1 ? 4 : 0;
          var tvOn = tvPower ? 8 : 0;
          var peopleInZone1 = p1InZone1 + p2InZone1 + d1InZone1 + tvOn;

          $('.lamp').removeClass('on on1 on2 on3 on4 on5 on6 on7 on8 on9 on10 on11 on12 on13 on14 on15');

          switch(peopleInZone1) {
            case 1:
                case 9:
            case 5:
                case 13:
              $('#tLamp, #flamp').addClass('on on1');
            break;

            case 2:
                case 10:
            case 6:
                case 14:
              $('#tLamp').addClass('on on2');
            break;

            case 3:
            case 7:
              $('#fLamp').addClass('on on3');
            break;
                case 11:
                case 15:
                  // $('#fLamp').addClass('on on11');
                  $('#fLamp').addClass('on on4');
                break;

            case 4:
              $('#fLamp').addClass('on on4');
            break;
                case 12:

                break;
          }

          //--------

          var p1InZone2 = person1InZone2 ? 1 : 0;
          var p2InZone2 = person2InZone2 ? 2 : 0;
          var d1InZone2 = dog1InZone2 ? 4 : 0;

          var peopleInZone2 = p1InZone2 + p2InZone2 + d1InZone2;

          switch(peopleInZone2) {
            case 1:
            case 5:
              $('#tLamp2').addClass('on on1');
            break;
            case 2:
            case 6:
              $('#tLamp2').addClass('on on2');
            break;
            case 3:
            case 7:
              $('#tLamp2').addClass('on on3');
            break;
            case 4:
              $('#tLamp2').addClass('on on4');
            break;
          }

        }



//+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x+x



    $( "#p1" ).draggable({
      drag: function( event, ui ) {
          person1InZone1 = isPersonInZone1 ( ui );
          person1InZone2 = isPersonInZone2 ( ui );
          determineLightState();
      }
    });
    $( "#p2" ).draggable({
      drag: function( event, ui ) {
          person2InZone1 = isPersonInZone1 ( ui );
          person2InZone2 = isPersonInZone2 ( ui );
          determineLightState();
      }
    });

    $( "#d1" ).draggable({
      drag: function( event, ui ) {
          dog1InZone1 = isPersonInZone1 ( ui );
          dog1InZone2 = isPersonInZone2 ( ui );
          determineLightState();
      }
    });

    $('#bt1, #bt2').draggable({drag: function( event, ui ) {}});
    $('.lamp, #sofa, #tv, #table').draggable({drag: function( event, ui ) {}});



    $('#tv').on('click',function() {
        $(this).toggleClass('on');
        tvPower = $(this).hasClass('on');
    });

    $('#btToggle').on('click',function() {
        var home = $('#home');
        home.toggleClass('bt');
        if( home.hasClass('bt') ) {
            $(this).val('Hide BT');
        }else{
            $(this).val('Show BT');
        }
    });





});
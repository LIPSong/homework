/**
 * Created by song on 16/10/4.
 */
$(document).ready(function () {
   var map;
   var info_window=new google.maps.InfoWindow({content:''});
   var markersArray=[];
   var bounds=new google.maps.LatLngBounds();

//1. Build a date picker for users to enter the date of the sighting.
    $("#datepicker").datepicker({ changeMonth: true, changeYear: true});


    //2. Build more engaging radio buttons for users to choose the creature type.
    $( "#type_select" ).buttonset();

    //3. Build number entry sliders for users to enter distance from creature, creature weight, and creature height.

    //3a. slide_dist
    $( "#slide_dist" ).slider({
        value:0,
        min: 0,
        max: 500,
        step: 10,
        slide: function( event, ui ) {
            $( "#distance" ).val( ui.value);
        }
    });
    $( "#distance" ).val( $( "#slide_dist" ).slider( "value" ));



    //3b. slide_weight

    $( "#slide_weight" ).slider({
        value:0,
        min: 0,
        max: 5000,
        step: 5,
        slide: function( event, ui ) {
            $( "#weight" ).val( ui.value);
        }
    });


    //3c.  slide_height
    $( "#slide_height" ).slider({
        value:0,
        min: 0,
        max: 20,
        step: 1,
        slide: function( event, ui ) {
            $( "#height" ).val( ui.value);
        }
    });

    //3d. latitude

    $( "#slide_lat" ).slider({
        value:0,
        min: -90,
        max: 90,
        step: 0.00001,
        slide: function( event, ui ) {
            $( "#latitude" ).val( ui.value);
        }
    });

    //3e. longitude

    $( "#slide_long" ).slider({
        value:0,
        min: -180,
        max: 180,
        step: 0.00001,
        slide: function( event, ui ) {
            $( "#longitude" ).val( ui.value);
        }
    });

    //4. Build a color mixer interface component for the user to enter creature color.

    function refreshSwatch() {

        var	red = $( "#red" ).slider( "value" );
        var	green = $( "#green" ).slider( "value" );
        var	blue = $( "#blue" ).slider( "value" );
        var	my_rgb = "rgb(" + red + "," + green + "," + blue + ")";

        $( "#swatch" ).css( "background-color", my_rgb );
        $( "#red_val" ).val(red );
        $( "#blue_val" ).val( blue);
        $( "#green_val" ).val( green);
        $( "#color_val" ).val( my_rgb);
    }

    $( "#red, #green, #blue" ).slider({
        orientation: "horizontal",
        range: "min",
        max: 255,
        value: 127,
        slide: refreshSwatch,
        change: refreshSwatch
    });



    $( "#red" ).slider( "value", 127 );
    $( "#green" ).slider( "value", 127 );
    $( "#blue" ).slider( "value", 127 );



    //5. Build a nicer-looking “submit“ button for the Sightings form..
    $("button:submit").button();

    $("#frmAddSighting").submit(function(){
        return false;
    });

    $('#btnSave').click(function() {

        $("#ddlTypes").empty();
        var $li=$("<option />");
        $li.html("请在下拉菜单中选择生物种类");
        $li.appendTo("#ddlTypes");


        var data = $("#frmAddSighting :input").serializeArray();

        $.post($("#frmAddSighting").attr('action'), data, function(json){

            if (json.status == "fail") {
                alert(json.message);
            }else if (json.status == "success") {
                alert(json.message);
                getAllTypes();
            }else{alert("Nothing Happened");}
        }, "json");

    });
    function initialize() {
       var myLatLng= {lat:35.942570, lng:120.168966};
       var mapOptions={
           zoom:13,
           center:myLatLng,
           mapTypeId:google.maps.MapTypeId.ROADMAP,
           scrollwheel:true
       };
       map=new google.maps.Map(document.getElementById("map_canvas"),mapOptions);

       if($("#ddlTypes").length){
           getAllTypes();
       }else {
           getAllSightings();
       }

   }
   initialize();
   
   function getAllSightings() {
       $.getJSON("service.php?action=getAllSightings",function (json) {
          if(json.sightings.length>0){
              $("#sight_list").empty();
              $.each(json.sightings,function () {
                  var info='时间: '+this['date']+',类型: '+this['type'];
                  var $li=$("<li />");
                  $li.html(info);
                  $li.addClass("sightings");
                  $li.attr('id',this['id']);
                  $li.click(function () {
                      getSingleSighting(this['id']);
                  });
                  $li.appendTo("#sight_list");
              });
          }
       });
   }
   //getAllSightings(); delete**

   function getSingleSighting(id) {
       $.getJSON("service.php?action=getSingleSighting&id="+id,function (json) {
           if(json.sightings.length>0){
               $.each(json.sightings,function () {
                   var loc=new google.maps.LatLng(this['lat'],this['long']);
                   //myLoc=JSON.stringify(loc);
                   //alert(myLoc);
                   var my_marker=new google.maps.Marker({
                      position: loc,
                      map: map,
                      title: this['type']
                  });
                  map.setCenter(loc,10);
              });
           }
       });
   }

   function getAllTypes() {
       $.getJSON("service.php?action=getSightingsTypes",function (json_types) {
           if(json_types.creature_types.length>0){
               $.each(json_types.creature_types,function () {
                   var info=this['type'];
                   var $li=$("<option />");
                   $li.html(info);
                   $li.appendTo("#ddlTypes");
               });
           }
       });
   }
   //getAllTypes(); delete**


   $("#ddlTypes").change(function () {
       if($(this).val()!=""){
           clearOverlays();
           getSightingsByType($(this).val());
       }
   });


   function getSightingsByType(type) {
       $.getJSON("service.php?action=getSightingsByType&type="+type,function (json) {
           if(json.sightings.length>0){
               $('#sight_list').empty();
               $.each(json.sightings,function () {
                   var info='高度: '+this['height'];
                   info+='米, 重量: '+this['weight']+'千克, <br>';
                   info+='纬度: '+this['lat']+', 经度: '+this['long'];
                   var loc=new google.maps.LatLng(this['lat'],this['long']);
                   var opts={
                       map:map,
                       position:loc
                   };
                   var marker=new google.maps.Marker(opts);
                   markersArray.push(marker);
                   google.maps.event.addListener(marker,'click',function () {
                       info_window.setContent(info);
                       info_window.open(map,marker);
                   });
                   var $li=$("<li />");
                   $li.html('时间: '+this['date']+', <br>类型: '+this['type']);
                   $li.addClass("sightings");
                   $li.click(function () {
                       info_window.setContent(info);
                       info_window.open(map,marker);
                   });
                   $li.appendTo("#sight_list");
                   bounds.extend(loc);
               });
               map.fitBounds(bounds);
           }
       })
   }

   function clearOverlays() {
       if(markersArray){
           for(i in markersArray){
               markersArray[i].setMap(null);
           }
           markersArray.length=0;
           bounds=null;
           bounds=new google.maps.LatLngBounds();
       }
   }





   
});
//function initMap() {
    // Create a map object and specify the DOM element for display.
//   var map = new google.maps.Map(document.getElementById('map'), {
//        center: {lat: -34.397, lng: 150.644},
//        scrollwheel: false,
//        zoom: 8
//    });
//}






























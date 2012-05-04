$(function () {
	$("#tab1").tab('show');
	$("#tab2").tab('show');
});

function initMyMap() {
        
              // get reference to the DIV that will hold the map.
              var mymapDiv = document.getElementById('mymap');

              // start an eniro map in the DIV.
              var map = new eniro.maps.Map(mymapDiv);              
          }
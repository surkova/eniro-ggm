$(function () {
	$("#tab1").tab('show');
	$("#tab2").tab('show');
});

window.onload = function () {
	initMyMap();
}

function initMyMap() {
	// get reference to the DIV that will hold the map.
	var mymapDiv = document.getElementById('mymap');

	// start an eniro map in the DIV.
	var map = new eniro.maps.Map(mymapDiv, {
		myLocationControl: true,
	});

	var mark = new eniro.maps.Marker({
		position: new eniro.maps.LatLng(59.31269, 18.07081), 
		icon: 'http://images2.wikia.nocookie.net/__cb20120322200704/angrybirds/images/b/bb/AB_red-bird_space.png',
		map: mymap  // by providing map the marker is directly added
		});
}
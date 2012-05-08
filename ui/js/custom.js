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
	var mymap = new eniro.maps.Map(mymapDiv, {
		myLocationControl: true,
		center: new eniro.maps.LatLng(59.38453, 18.01366),
		zoom: 11
	});

	//FIRST MARKER

	var mark = new eniro.maps.Marker({
			position: new eniro.maps.LatLng(59.38590, 18.00787), 
			icon: 'img/osd-flower-icon-small.png',
			map: mymap  // by providing map the marker is directly added
		}
	);

	// we use one info window instance to only ever open one popup
	var infoWindow = new eniro.maps.InfoWindow();

	eniro.maps.event.addListener(mark, 'click', function () {
		infoWindow.setContent("<div class='popupInfo'><h6><a href='#'>Indiska blommor</a></h6>Orkide – <em>1m rupiah</em>,<br />Rosor – <em>500k rupiah</em><br /><img src='img/osd-flower-icon-fullsize.png'></div>");
		infoWindow.open(mark);
	});

	//SECOND MARKER

	var mark1 = new eniro.maps.Marker({
			position: new eniro.maps.LatLng(59.38605, 18.01355), 
			icon: 'img/pollen-flower-icon-small.png',
			map: mymap  // by providing map the marker is directly added
		}
	);

	// we use one info window instance to only ever open one popup
	var infoWindow = new eniro.maps.InfoWindow();

	eniro.maps.event.addListener(mark1, 'click', function () {
		infoWindow.setContent("<div class='popupInfo'><h6><a href='#'>Ryska blommor</a></h6>Orkide – <em>100 rubler</em>,<br />Rosor – <em>500 rubler</em><br /><img src='img/pollen-flower-icon-fullsize.png'></div>");
		infoWindow.open(mark1);
	});

	//THIRD MARKER

	var mark2 = new eniro.maps.Marker({
			position: new eniro.maps.LatLng(59.38142, 18.01398), 
			icon: 'img/rose-icon-small.png',
			map: mymap  // by providing map the marker is directly added
		}
	);

	// we use one info window instance to only ever open one popup
	var infoWindow = new eniro.maps.InfoWindow();

	eniro.maps.event.addListener(mark2, 'click', function () {
		infoWindow.setContent("<div class='popupInfo'><h6><a href='#'>Franska blommor</a></h6>Orkide – <em>5 euro</em>,<br />Rosor – <em>10 euro</em><br /><img src='img/rose-icon-fullsize.png'></div>");
		infoWindow.open(mark2);
	});
}
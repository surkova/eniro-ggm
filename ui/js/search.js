$(function () {
	var currentLocation;
	var map;
	var map_container = $("#map");

	//initialize and manipulate the map
	function initMap() {
		var mapDiv = document.getElementById('map');

		map = new eniro.maps.Map(mapDiv, {
			center: new eniro.maps.LatLng(59.33247, 18.11905),
			zoom: 6
		});
	};

	initMap();
	map_container.hide();

	//datepicker initialization
	$("#datepicker").datepicker({dateFormat: "yy-mm-dd"});
	var altFormat = $("#datepicker").datepicker("option", "dateFormat");
	$("#datepicker").datepicker("option", "dateFormat", "yy-mm-dd");
	$("#datepicker").attr("placeholder", "Idag");

	//search
	var marker;
	var markers = [];
	var infoWindow;
	var infoWindows = [];
	$("#sok").click(function () {
		//take the content of the input field
		var req = $("#req").val();

		/*pass req and current geolocation, get json response from Eniro
		display company name with rejta url, rejta rating, company address and phone for each hit
		return false not to refresh the page*/
		$.getJSON("http://api.eniro.com/cs/search/basic", {
				profile: "ggmprox",
				key: "3263099275612453667",
				country: "se",
				version: "1.1.3",
				search_word: req
			},
			function(proximityData) {
                map_container.hide();

				$("#searchResults").empty();

				$.each(markers, function (key, val) {
					val.setMap(null);
				});
				markers = [];
				$.each(infoWindows, function (key, val) {
					val.close();
				});
				infoWindows = [];

				$.each(proximityData.adverts, function (key, val) {
					//adding markers and listen for clicks on their icons
					if (val.location.coordinates[0].latitude !== null) {
                        map_container.show();
						marker = new eniro.maps.Marker({
							position: new eniro.maps.LatLng(val.location.coordinates[0].latitude, val.location.coordinates[0].longitude),
							map: map
						});

						eniro.maps.event.addListener(marker, 'click', function () {
							infoWindow = new eniro.maps.InfoWindow();
							infoWindow.setContent(val.companyInfo.companyName);
							infoWindow.open(this);
							infoWindows.push(infoWindow);
						});

						//array of markers to destroy them afterwards
						markers.push(marker);
					};

					//request for json
					$.getJSON("http://api.eniro.com/rs/company/basic", {
						profile: "ggmrejta",
						key: "4887234730381502142",
						country: "se",
						version: "1.1.2",
						eniro_id: val.eniroId
					},
					function(ratingData) {
						var tpl = $('#searchTpl').html();
						var searchHit = Mustache.to_html(tpl, {x: val, r: ratingData});
						$('#searchResults').append(searchHit);

						/*button "leverera från dom" that appears in the search results.
						it copies delivery company's address to the form input*/
						$(".deliveryHere").click(function () {
							var address = $(this).parent().parent().find(".deliveryAddress").html();
							var div = document.createElement("div");
							div.innerHTML = address;
							var text = div.textContent || div.innerText || "";
							$("#deliveryFrom").val(text);
						});
					});
				})
			});
		return false;
	});

	//actions for "Leverera till mig!" button
	$("#deliveryAction").click(function () {
		if ($("#deliveryFrom").val() == '') {
			alert ("Oj! Leveransadress saknas!");
			return false;
		}
		if ($("#datepicker").val() == '') {
			alert ("Oj! När vill du att vi levererar?");
			return false;
		}
		$("#deliveryFrom").val('');
		$("#datepicker").val('');
		alert("Tack!");
		return false;
	});
});

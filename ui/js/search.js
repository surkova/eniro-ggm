$(function () {
	//initialize and manipulate and hide the map onload
	var map;
	function initMap() {
		var mapDiv = document.getElementById('map');

		map = new eniro.maps.Map(mapDiv, {
			center: new eniro.maps.LatLng(59.33247, 18.11905),
			zoom: 6
		});
	};
	initMap();
	$("#map").hide();

	//datepicker initialization
	$("#datepicker").datepicker({dateFormat: "yy-mm-dd"});
	var altFormat = $("#datepicker").datepicker("option", "dateFormat");
	$("#datepicker").datepicker("option", "dateFormat", "yy-mm-dd");
	$("#datepicker").attr("placeholder", "Idag");

	//search and markers on the maps
	var marker;
	var markers = [];
	var infoWindow;
	var infoWindows = [];
	$("#searchBtn").click(function () {
		//take the content of the input field
		var req = $("#req").val();

		/*pass search query, get json response from Eniro
		display company name with rejta url, rejta rating, company address and phone for each hit
		return false not to refresh the page*/
		$.getJSON("http://api.eniro.com/cs/search/basic", {
				profile: "ggmprox",
				key: "3263099275612453667",
				country: "se",
				version: "1.1.3",
				search_word: req
			},
			function(searchData) {
                $("#map").hide();

				$("#searchResults").empty();

				//reset the markers and infoWindows that have been added and opened
				$.each(markers, function (key, val) {
					val.setMap(null);
				});
				markers = [];
				$.each(infoWindows, function (key, val) {
					val.close();
				});
				infoWindows = [];

				//for each search hit
				$.each(searchData.adverts, function (key, val) {

					//add marker and listen for clicks on its icon
					if (val.location.coordinates[0].latitude !== null) {
                        $("#map").show();
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

					//request rating
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

	//pretend that we send the form
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

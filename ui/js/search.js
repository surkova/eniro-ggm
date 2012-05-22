$(function () {
	var currentLocation;

	//initialize and manipulate the map
	function initMap() {
		var mapDiv = document.getElementById('map');

		var map = new eniro.maps.Map(mapDiv, {
			myLocationControl: true,
			center: new eniro.maps.LatLng(59.33247, 18.11905),
			zoom: 6
		});

		$(".e-mylocation:not(.e-mylocation-active)").click(function () {
			eniro.maps.event.addListener(map, 'center_changed', function () {
				currentLocation = map.getCenter();
			} );
		});
	};
	initMap();

	//datepicker initialization
	$("#datepicker").datepicker({dateFormat: "yy-mm-dd"});
	var altFormat = $("#datepicker").datepicker("option", "dateFormat");
	$("#datepicker").datepicker("option", "dateFormat", "yy-mm-dd");
	$("#datepicker").attr("placeholder", "Idag");

	//search
	$("#sok").click(function () {
		//take the content of the input field
		var req = $("#req").val();

		if (jQuery.isEmptyObject(currentLocation)) {
			$("#searchResults").append("<p>Var är du nånstans?</p>");
			return false;
		}

		/*pass req and current geolocation, get json response from Eniro
		display company name with rejta url, rejta rating, company address and phone for each hit
		return false not to refresh the page*/
		$.getJSON("http://api.eniro.com/cs/proximity/basic", {
				profile: "ggmprox",
				key: "3263099275612453667",
				country: "se",
				version: "1.1.3",
				search_word: req,
				latitude: currentLocation.y,
				longitude: currentLocation.x
			},
			function(proximityData) {
				$("#searchResults").empty();

				$.each(proximityData.adverts, function (key, val) {

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
	
});
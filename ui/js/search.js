$(function () {
	var coord;

	//initialize and manipulate the map
	function initMap() {
		var mapDiv = document.getElementById('map');

		var map = new eniro.maps.Map(mapDiv, {
			myLocationControl: true,
			zoom: 2
		});

		$(".e-mylocation:not(.e-mylocation-active)").click(function () {
			eniro.maps.event.addListener(map, 'center_changed', function () {
				coord = map.getCenter();
				$("#delivery-to").val("Center: " + coord.y + ", " + coord.x);
			} );
		});
	};
	initMap();

	$("#sok").click(function () {
		//take the content of the input field
		var req = $("#req").val();

		if (jQuery.isEmptyObject(coord)) {
			$("#searchResults").append("<p>Var är du nånstans?</p>");
			return false;
		}

		//pass req, get json response from Eniro
		//display company name with rejta url and company address for each hit
		//return false not to refresh the page
		$.getJSON("http://api.eniro.com/cs/proximity/basic", {
				profile: "ggmprox",
				key: "3263099275612453667",
				country: "se",
				version: "1.1.3",
				search_word: req,
				latitude: coord.y,
				longitude: coord.x
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
						
						if (val.companyReviews !== null && val.companyInfo.companyName !== null) {
							$("#searchResults").append("<h3><a href='" + val.companyReviews+"'>" + val.companyInfo.companyName + "</a></h3>");
							
							if (ratingData.adverts[0].rating.numberOfReviews !== null & ratingData.adverts[0].rating.averageRating !== null)
								$("#searchResults").append("<p>Omdömen " + ratingData.adverts[0].rating.numberOfReviews + ",&nbsp;Rating " + ratingData.adverts[0].rating.averageRating + "</p>");

							if (val.address.streetName !== null)
								$("#searchResults").append("<span>" + val.address.streetName + "</span>");
							
							if (val.address.postCode !== null && val.address.postArea !== null)
								$("#searchResults").append("<span>" + val.address.postCode + "&nbsp;" + val.address.postArea + "</span>");

							$.each(val.phoneNumbers, function (key, val) {
								$("#searchResults").append("<span>" + val.type + "&nbsp;" + val.phoneNumber + "</span>");
							});
						};
					});
				});
			});
		return false;
	});
});
$(function () {
	var coord;
	//initialize and manipulate the map
	function initMap() {
		var mapDiv = document.getElementById('map');

		var map = new eniro.maps.Map(mapDiv, {
			myLocationControl: true,
			zoom: 2
		});

		eniro.maps.event.addListener(map, 'center_changed', function () {
			coord = map.getCenter();
			$("#delivery-to").val(coord.x + ", " + coord.y);
		} );
	};
	initMap();

	$("#sok").click(function () {

		//take the content of the input field
		var req = $("#req").val();
		var searcharea = $("#searcharea").val();

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
			function(data) {
				$("#searchResults").empty();
				$.each(data.adverts, function (key, val) {
					if (val.companyReviews !== null && val.companyInfo.companyName !== null) {
						$("#searchResults").append("<h6><a href='" + val.companyReviews+"'>" + val.companyInfo.companyName + "</a></h6>");
						
						if (val.address.streetName !== null)
								$("#searchResults").append("<p>" + val.address.streetName + "</p>");
						
						if (val.address.postCode !== null && val.address.postArea !== null)
								$("#searchResults").append("<p>" + val.address.postCode + "&nbsp;" + val.address.postArea + "</p>");
					};
				});
			}
		);
		return false;
	});
});
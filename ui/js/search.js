$(function () {
	$("#sok").click(function () {

		//take the content of the input field
		var req = $("#req").val();
		var sokarea = $("#sokarea").val();

		//pass req, get json response from Eniro
		//display company name with rejta url and company address for each hit
		//return false not to refresh the page
		$.getJSON("http://api.eniro.com/cs/search/basic",
			{
				profile: "ggmsearch",
				key: "7219929822480078432",
				country: "se",
				version: "1.1.3",
				from_list: 1,
				to_list: 10,
				search_word: req,
				geo_area: sokarea
			},
			function(data) {
				$("#searchResults").empty();
				$.each(data.adverts, function (key, val) {
					if (val.companyReviews != null && val.companyInfo.companyName != null)
						{
							$("#searchResults").append("<h6><a href='" + val.companyReviews+"'>" + val.companyInfo.companyName + "</a></h6>");
							if (val.address.streetName != null)
								{
									$("#searchResults").append("<p>" + val.address.streetName + "</p>");
								};
							if (val.address.postCode != null && val.address.postArea != null)
								{
									$("#searchResults").append("<p>" + val.address.postCode + "&nbsp;" + val.address.postArea + "</p>");
								};
						};
				});
			}
		);
		return false;
	});

	//initialize the map
	initKarta();
});

//display the map
function initKarta() {
	var kartaDiv = document.getElementById('karta');

	var karta = new eniro.maps.Map(kartaDiv, {
		zoom: 2
	});
};
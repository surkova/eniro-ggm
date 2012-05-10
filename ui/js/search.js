$(function () {
	$("#sok").click(function () {
		var req = $("#req").val();
		$.getJSON("http://api.eniro.com/cs/search/basic",
			{
				profile: "ggmsearch",
				key: "7219929822480078432",
				country: "se",
				version: "1.1.3",
				search_word: req
			},
			function(data) {
				$("#searchResults").empty();
				$.each(data.adverts, function (key, val) {
					$("#searchResults").append("<p><a href='"+val.companyReviews+"'>" + val.companyInfo.companyName + "</a></p>");
					$("#searchResults").append("<p>" + val.companyInfo.companyText + "</p>");
				});
			}
		);
		return false;
	});
});
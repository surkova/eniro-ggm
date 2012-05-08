$.getJSON("http://api.eniro.com/cs/search/basic",
	{
		profile: "ggmsearch",
		key: "7219929822480078432",
		country: "se",
		version: "1.1.3",
		search_word: "advokat"
	},
	function(data) {
		$.each(data.adverts, function (key, val) {
			$("#searchResults").append("<p><a href='"+val.companyReviews+"'>" + val.companyInfo.companyName + "</a></p>");
			$("#searchResults").append("<p>" + val.companyInfo.companyText + "</p>");
		});
		//$("#searchResults").append("<p>" + data.adverts[0].companyInfo.companyName + "</p>");
	}
);
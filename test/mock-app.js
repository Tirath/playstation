"use strict";

var app = app || {};

(function oldRenderList() {

	var data = app.mockData,
		total = data._total,
		pageNavigation = document.getElementById("page-navigation"),
		gameResults = document.getElementById('game-results');

	var navigationImages = pageNavigation.getElementsByTagName('a');

	app.currentPage = 1;

	navigationImages[0] = data._links.prev;
	navigationImages[1] = data._links.next;

	document.getElementById("total-results").textContent = total;
	document.getElementById("navigation-number").textContent = app.getNavigationNumber(total);

	for (var i = 0; i < 5; i++) {
		var element = document
						.getElementsByTagName("ul")[0]
						.getElementsByTagName("li")[i];

		element.childNodes[1].src = data.streams[i].preview.small;
		element.childNodes[3].textContent = data.streams[i].channel.display_name;
	}
})();

app.oldRenderList = function (data) {
	var displaySettings,
		gameResults = document.getElementsByTagName("ul")[0].getElementsByTagName("li");

	for (var i = 0, image, description; i < 5; i++) {
		displaySettings = "none"

		image = gameResults[i].childNodes[1];
		description = gameResults[i].childNodes[3];

		if (data.streams[i]) {
			displaySettings = "block";

			image.src = data.streams[i].preview.small;
			description.textContent = data.streams[i].channel.display_name;
		}

		gameResults[i].style.display = displaySettings;
	}
}

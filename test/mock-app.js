"use strict";

var app = app || {};

(function oldRenderList() {

	/*var data = app.mockData,
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
	}*/
})();

/*app.oldRrenderList = function (data) {
	var displaySettings, li, image, description,
		docFragment = document.createDocumentFragment();

	var gameResults = document.getElementById("game-results");
	gameResults.parentNode.removeChild(gameResults);

	var ul = document.createElement("ul");

	ul.id = "game-results";
	ul.classList.add("game-results");

	for (var i = 0; i < 100; i++) {

		li 			= document.createElement("li");
		image 		= document.createElement("img");
		description = document.createElement("div");

		if (data.streams[i]) {
			image.src = data.streams[i].preview.small;
			image.classList.add("game-image");

			description.textContent = data.streams[i].channel.display_name;
			description.classList.add("game-data");

			li.classList.add("game-row");
			li.appendChild(image);
			li.appendChild(description);

			docFragment.appendChild(li);
		}
	}

	ul.appendChild(docFragment);
	app.resultsBox.appendChild(ul)
};*/
"use strict";

var app = app || {};

app.currentPage = 0;

app.searchGames = function () {
	app.currentPage = 1;
	return app.getGames(escape(document.getElementById("search-box").value), false);
};

app.navigatePreviousGames = function () {
	if (!app.dataInProgress) {
		--app.currentPage;
		app.getGames(false, app.data._links.prev);
	}

	return false;
};

app.navigateNextGames = function () {
	if (!app.dataInProgress) {
		++app.currentPage;
		app.getGames(false, app.data._links.next);
	}

	return false;
};

app.setGames = function (data) {
	var total;

	if (!data) {
		return;
	}

	app.data = data;
	document.body.removeChild(app.script);
	app.dataInProgress = false;

	total = data._total;

	app.currentPage = total ? app.currentPage : total;  // check if streams available
	
	app.disableButtons(total);
	
	app.totalResults.textContent = total;
	app.navigationNumber.textContent = app.getNavigationNumber(total);

	var x = new Date().getTime();
	app.renderList(data);
	console.log(new Date().getTime() - x);
};

app.renderList = function (data) {
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
}

app.disableButtons = function (total) {
	app.previousImage.disabled = !app.data._links.prev;
	app.nextImage.disabled = app.currentPage === Math.ceil(total/5);
}

app.getNavigationNumber = function (total) {
	return app.currentPage + "/" + Math.ceil(total/5);
};

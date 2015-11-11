"use strict";

var app = app || {};

app.currentPage = 0;

app.searchGames = function () {
	app.currentPage = 1;
	app.message.style.display = "none";
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

	app.data = data;
	app.dataInProgress = false;
	total = data ? data._total : 0;

	// document.body.removeChild(app.script);  // remove the script tag
	
	if (!total) {
		app.errorMessage.style.display 	= "block";

		return;
	}

	app.error = false;

	app.currentPage = total ? app.currentPage : total;  // check if streams available
	
	app.disableButtons(total);
	
	app.totalResults.textContent = total;
	app.navigationNumber.textContent = app.getNavigationNumber(total);

	app.renderList(data);
};

app.renderList = function (data) {
	var gameResults = document.getElementsByTagName("ul")[0].getElementsByTagName("li"),
		displaySettings, game, description, currentStream;

	for (var i = 0; i < 5; i++) {
		displaySettings = "none"

		currentStream = data.streams[i];
		game = gameResults[i].getElementsByClassName("game");

		if (currentStream) {
			displaySettings = "block";

			game[0].src = currentStream.preview.medium;
			game[1].textContent = currentStream.channel.display_name;

			description = "The game, " + currentStream.channel.game + ", was created at" + currentStream.created_at + " and has been viewed by " + currentStream.viewers + ".";
			game[2].textContent = description;
		}

		gameResults[i].style.display = displaySettings;
	}
};

app.disableButtons = function (total) {
	app.previousImage.disabled = !app.data._links.prev;
	app.nextImage.disabled = app.currentPage === Math.ceil(total/5);
};

app.getNavigationNumber = function (total) {
	return app.currentPage + "/" + Math.ceil(total/5);
};

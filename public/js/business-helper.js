"use strict";

var app = app || {};

app.getGames = function (query, url) {

	var callback = "&callback=app.setGames",
		cacheBuster = "&time=" + new Date().getTime();

	app.error = false;

	app.script = document.createElement('script');

	app.script.type='text/javascript';
	app.script.src = url || "https://api.twitch.tv/kraken/search/streams?limit=5&offset=0&query=" + query;

	app.script.src = app.script.src + callback + cacheBuster;
	
	app.dataInProgress = true;
	document.body.appendChild(app.script);

	setTimeout(function () {
		app.error = true;
		// app.setGames();
	}, 5000);

	return false;
};

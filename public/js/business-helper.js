"use strict";

var app = app || {};

app.getGames = function (query, url) {

	var callback = "&callback=app.setGames",
		cacheBuster = "&time=" + new Date().getTime();

	app.script = document.createElement('script');

	app.script.type='text/javascript';
	app.script.src = url || "https://api.twitch.tv/kraken/search/streams?limit=5&offset=0&query=" + query;

	app.script.src = app.script.src + callback + cacheBuster;
	
	app.dataInProgress = true;
	document.body.appendChild(app.script);

	return false;
};

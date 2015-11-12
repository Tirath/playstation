"use strict";

var app = app || {};

app.getGames = function (query, url) {

	var callback = "&callback=app.response",
		cacheBuster = "&time=" + new Date().getTime();

	app.error = false;

	app.script = document.createElement('script');

	app.script.type='text/javascript';
	app.script.src = url || "https://api.twitch.tv/kraken/search/streams?limit=5&offset=0&query=" + query;

	app.script.src = app.script.src + callback + cacheBuster;
	
	app.dataInProgress = true;
	app.ps.subscribe("onData", app.setGames);

	document.body.appendChild(app.script);

	app.jsonpTimer = setTimeout(function () {
		app.response();
	}, 5000);

	return false;
};

app.ps = {

	events: {},

	subscribe: function (event, func) {
		if (!this.events[event]) {
			this.events[event] = [];
		}

		if (this.events[event].indexOf(func) === -1) {
			this.events[event].push(func);
		}
	},

	unsubscribe: function (event, func) {
		var index, array;

		if (this.events[event]) {
			array = this.events[event];
			index = array.indexOf(func);
			array.splice(index, 1);

		}
	},

	publish: function (event, data) {
		if (this.events[event]) {
			this.events[event].forEach(function(func) {
				if (typeof func === "function") {
					func(data || {});
				}
			});
		}
	}
};

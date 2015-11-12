"use strict";

var app = app || {};

/*
 * makes API calls
 */
app.getGames = function (query, url) {

	if (!query && !url) return false;

	var callback = "&callback=app.response",
		cacheBuster = "&time=" + new Date().getTime();  // prevent cache issue if any

	app.script = document.createElement(app.constants.script);

	app.script.type='text/javascript';
	app.script.src = url || "https://api.twitch.tv/kraken/search/streams?limit=5&offset=0&query=" + query;  // search or pagination

	app.script.src = app.script.src + callback + cacheBuster;
	
	app.dataInProgress = true;  // no repetitive API calls
	app.ps.subscribe("onData", app.setGames);  // subscribes to exec setGames once response is received

	document.body.appendChild(app.script);

	// error scenario
	app.jsonpTimer = setTimeout(function () {
		app.response({});
	}, 5000);

	return false;
};

/*
 * to do multiple things and to unsubscribe error scenario calling setGames - will help in code modularity for jsonp calls  and multiple callbacks
 */
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

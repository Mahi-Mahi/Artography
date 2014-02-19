/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function(app) {
	"use strict";

	app.controller('ArtistsController', ['$scope', 'dataService',
		function($scope, dataService) {

			console.log("ArtistsController");

			var years = dataService.data.years;
			console.log(years);

			$scope.period = 'today';

			$scope.periods = [{
				name: "aujourd'hui",
				slug: 'today',
				checked: 'CHECKED'
			}];

			angular.forEach(years, function(year) {
				$scope.periods.push({
					name: year,
					slug: year,
					checked: null
				});
			});

			$scope.$watch('period', function(value) {
				$scope.period = value;
				dataService.getExpos($scope.period).then(function() {
					drawChart();
				});
			});

			// console.log("max_artists : " + max_artists);

			var canvasW = 600,
				canvasH = 600;

			var divW = 600,
				divH = 600;

			var chart = Raphael(document.getElementById('canvas'), canvasW, canvasH);

			var artists_countries_elt = {};

			var offsetX = 0,
				offsetY = 0;

			var originX = offsetX + divW / 2;
			var originY = offsetY + divH / 2;

			var central_radius = divW / 4 - 90;

			chart.circle(originX, originY, central_radius - 5).attr({
				'stroke': '#333',
				'stroke-width': 1
			});

			function updateStatus(nb_artists, nb_countries, in_country) {
				angular.element('.status').html("Actuellement " + nb_artists + " artistes<br /> exposent dans " + nb_countries + " pays");
			}

			function drawChart() {

				console.log("drawChart");

				console.log($scope.period);

				var expos = dataService.data.expos[$scope.period];
				console.log("expos : " + expos.length);

				var countries = dataService.data.countries;
				var nb_countries = 0;

				var data = {};
				var artists = [];
				var artists_countries = [];

				angular.forEach(expos, function(expo) {
					if (!data[expo.c])
						data[expo.c] = [];
					if (data[expo.c].indexOf(expo.i) == -1) {
						data[expo.c].push(expo.i);
						nb_countries++;
					}
					if (artists.indexOf(expo.i) == -1) {
						artists.push(expo.i);
					}
				});

				var max_artists = 0;
				angular.forEach(data, function(artist_ids) {
					max_artists = Math.max(max_artists, artist_ids.length);
				});

				updateStatus(artists.length, nb_countries);

				var a = 2 * Math.PI / Object.keys(data).length;

				var startA = 0;
				var endA = 0;

				var slice;

				var i = 0;

				console.log(data);

				angular.forEach(data, function(artists, country) {

					//start and end points of the topic region
					if (i > 0) {
						startA = endA;
					}
					endA = startA + a;

					// console.log(country + " : " + artists.length);

					var radius = central_radius;
					var layerW = divW / 3 / max_artists;

					angular.forEach(artists, function(artist) {

						var blX = originX + Math.sin(endA) * radius;
						var blY = originY + Math.cos(endA) * radius;
						var brX = originX + Math.sin(startA) * radius;
						var brY = originY + Math.cos(startA) * radius;
						var tplX = originX + Math.sin(endA) * (radius + layerW);
						var tplY = originY + Math.cos(endA) * (radius + layerW);
						var tprX = originX + Math.sin(startA) * (radius + layerW);
						var tprY = originY + Math.cos(startA) * (radius + layerW);

						// var strokeW = (fullRadius / orderKey.length) / 2
						// var startRadius = divW / 4 - .5 * strokeW - 40;
						// var strokeRadius = startRadius + strokeW + (strokeW + 2) * l

						var path = [
							["M", blX, blY],
							["A", radius, radius, 0, 0, 1, brX, brY],
							["L", tprX, tprY],
							["A", radius + layerW, radius + layerW, 0, 0, 0, tplX, tplY],
							["L", blX, blY],
							['z']
						];
						radius += layerW;

						// console.log(path);
						var key = country + '-' + artist;

						artists_countries.push(key);

						if (artists_countries_elt[key]) {
							slice = chart.getById(artists_countries_elt[key]);
							var transformedPath = Raphael.transformPath(slice.attr('path').toString(), path);
							slice.animate({
								path: path
							}, 500, null, function() {
								// console.log("animated");
							}).attr({
								fill: '#0000FF',
								"stroke-width": 0.5,
								"stroke": "#fff"
							});
						} else {
							slice = chart.path(path).attr({
								fill: '#FF0000',
								"stroke-width": 0.5,
								"stroke": "#fff"
							});

							slice.node.setAttribute('class', 'country-' + country + ' artist artist-' + artist);

							artists_countries_elt[key] = slice.id;

						}

					});

					i++;

				});

				angular.forEach(artists_countries_elt, function(slice_id, artist_country_id) {

					if (artists_countries.indexOf(artist_country_id) == -1) {
						chart.getById(slice_id).remove();
						delete artists_countries_elt[artist_country_id];
					}
				});

			}

		}

	]);
});
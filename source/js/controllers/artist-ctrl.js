/* global define */
"use strict";

define([], function() {

	return ['$scope', '$location', 'dataService',
		function($scope, $location, dataService) {

			console.log("ArtistController");

			var years = dataService.data.years;

			// default period
			$scope.period = '2010';

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
					update();
				});
			});

			// Artists list
			$scope.artists = [];
			// Countries list
			$scope.countries = [];

			// incremented at each filters change
			var iteration = 0;

			var nb_countries = 0;
			var max_artists = 0;

			var canvasW = 700,
				divW = 700,
				canvasH = 700,
				divH = 700;

			var chart = new Raphael(document.getElementById('canvas'), canvasW, canvasH);

			// [ X Position, Y Position, Radius, Width, Angle, Rotation ]
			chart.customAttributes.filledArc = function(xloc, yloc, R, width, angle, rotation) {
				var total = 360;
				if (total == angle) {
					angle -= 0.001;
				}
				angle += rotation;
				var r = (90 - rotation) * Math.PI / 180,
					xr = xloc + R * Math.cos(r),
					yr = yloc - R * Math.sin(r),
					xr1 = xloc + (R - width) * Math.cos(r),
					yr1 = yloc - (R - width) * Math.sin(r);
				var a = (90 - angle) * Math.PI / 180,
					x = xloc + R * Math.cos(a),
					y = yloc - R * Math.sin(a),
					x1 = xloc + (R - width) * Math.cos(a),
					y1 = yloc - (R - width) * Math.sin(a);
				return {
					path: [
						["M", xr1, yr1],
						["L", xr, yr],
						["A", R, R, 0, +(angle > 180 + rotation), 1, x, y],
						["L", x1, y1],
						["A", R - width, R - width, 1, +(angle > 180 + rotation), 0, xr1, yr1]
					]
				};
			};

			var offsetX = 0,
				offsetY = 0;

			var originX = offsetX + divW / 2;
			var originY = offsetY + divH / 2;

			var central_radius = divW / 4 - 90;

			var animation_delay = 500;
			var a_interval = 2;

			chart.circle(originX, originY, central_radius - 5).attr({
				'stroke': '#333',
				'stroke-width': 1
			});

			/*
			chart.path().attr({
				"stroke": "#00f",
				"fill": "#f00",
				"stroke-width": 1,
				filledArc: [originX, originY, central_radius, 12, 90, 0]
			});
*/

			// create continents/countries container
			var data = {
				continents: {},
				cc: {}
			};

			angular.forEach(dataService.data.countries, function(countries, continent_name) {
				data.continents[continent_name] = {
					slice: null,
					set: chart.set(),
					'countries': {}
				};
				angular.forEach(countries, function(names, country_id) {
					data.cc[country_id] = continent_name;
					data.continents[continent_name].countries[country_id] = {
						country: names,
						slice: null,
						artists: {},
						set: chart.set()
					};
				});
			});

			function update() {
				parseData();
				drawChart();
			}

			function parseData() {

				iteration++;

				console.log($scope.period);

				var expos = dataService.data.expos[$scope.period];
				console.log(dataService.data);
				console.log("expos : " + expos.length);

				$scope.countries = [];
				max_artists = 0;

				angular.forEach(data.continents, function(continent, continent_name) {
					angular.forEach(continent.countries, function(country, country_code) {
						data.continents[continent_name].countries[country_code].has_artists = 0;
						data.continents[continent_name].countries[country_code].nb_artists = 0;
						// data.continents[continent_name].countries[country_code].rotation = 0;
					});
				});

				angular.forEach(expos, function(expo) {
					if (true /* TODO :  filter by age and sex */ ) {
						var country = data.continents[data.cc[expo.c]].countries[expo.c];
						var artists = country.artists;
						if (!artists[expo.i]) {
							artists[expo.i] = {
								slice: null,
								iteration: 0
							};
						}
						if (artists[expo.i].iteration < iteration) {
							if (!country.nb_artists) {
								country.nb_artists = 1;
							} else {
								country.nb_artists++;
							}
							max_artists = Math.max(max_artists, country.nb_artists);
						}
						artists[expo.i].iteration = iteration;
						if ($scope.countries.indexOf(expo.c) == -1) {
							$scope.countries.push(expo.c);
						}
						if ($scope.artists.indexOf(expo.i) == -1) {
							$scope.artists.push(expo.i);
						}
						country.has_artists = true;
						country.artists = artists;
						data.continents[data.cc[expo.c]].countries[expo.c] = country;
					}
				});

				nb_countries = $scope.countries.length;

				updateStatus($scope.artists.length, nb_countries);

			}

			function updateStatus(nb_artists, nb_countries, in_country) {
				in_country = null;
				angular.element('.status').html("Actuellement " + nb_artists + " artistes<br /> exposent dans " + nb_countries + " pays");
			}

			function drawChart() {

				console.log("drawChart");

				console.log("nb_countries : " + nb_countries);
				console.log("max_artists : " + max_artists);

				var a = (360 - (nb_countries * a_interval)) / nb_countries;
				var rotation = 0;

				var new_filledArc, previous_artist_filledArc;

				angular.forEach(data.continents, function(continent, continent_name) {
					// console.log("->" + continent_name);

					angular.forEach(continent.countries, function(country, country_code) {
						// console.log(country_code);

						var radius = central_radius;
						var previous_artist = null;

						angular.forEach(country.artists, function(artist) {

							var layerW = artist.iteration < iteration ? 0 : divW / 3 / max_artists;

							radius += layerW;

							// filledArc : [ X Position, Y Position, Radius, Width, Angle, Rotation ]
							var previous_filledArc = artist.filledArc;
							artist.filledArc = [originX, originY, radius, layerW, a, rotation];

							if (artist.slice === null) {
								if (previous_artist) {
									new_filledArc = previous_artist_filledArc;
								} else {
									new_filledArc = [originX, originY, central_radius, layerW, a, country.rotation === undefined ? rotation : country.rotation];
								}
								artist.slice = chart.path().attr({
									fill: '#FF0000',
									// stroke: "#FF4444",
									'stroke-width': 0,
									filledArc: new_filledArc
								}).animate({
									filledArc: artist.filledArc
								}, animation_delay);

								artist.slice.node.setAttribute('class', 'country-' + country_code + ' artist artist-' + artist.i);
							} else {
								artist.slice.animate({
									filledArc: artist.filledArc
								}, animation_delay, null, function() {
									// console.log("animated");
								});
							}

							previous_artist_filledArc = previous_filledArc;

						});

						rotation += country.has_artists ? (a + a_interval) : 0;

						data.continents[continent_name].countries[country_code].rotation = country.rotation = rotation;
					});

				});

			}

		}

	];
});
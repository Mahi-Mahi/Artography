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

			// default period
			$scope.period = '2013';

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

			var raphael = new Raphael(document.getElementById('canvas'), canvasW, canvasH);

			// [ X Position, Y Position, Radius, Width, Angle, Rotation ]
			raphael.customAttributes.filledArc = function(xloc, yloc, R, width, angle, rotation) {
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

			raphael.customAttributes.simpleArc = function(xloc, yloc, R, angle, rotation) {
				var total = 360;
				if (total == angle) {
					angle -= 0.001;
				}
				angle += rotation;
				var r = (90 - rotation) * Math.PI / 180,
					xr1 = xloc + R * Math.cos(r),
					yr1 = yloc - R * Math.sin(r);
				var a = (90 - angle) * Math.PI / 180,
					x = xloc + R * Math.cos(a),
					y = yloc - R * Math.sin(a);
				return {
					path: [
						["M", x, y],
						["A", R, R, 0, +(angle > 180 + rotation), 0, xr1, yr1],
					]
				};
			};

			var offsetX = 0,
				offsetY = 0;

			var originX = offsetX + divW / 2;
			var originY = offsetY + divH / 2;

			var central_radius = 60;
			var continent_title_margin = 30;
			var country_title_margin = 30;
			var margin = 20 + continent_title_margin + country_title_margin;

			var animation_delay = 500;
			var a_interval = 2;

			raphael.circle(originX, originY, central_radius - 5).attr({
				'stroke': '#333',
				'stroke-width': 1
			});

			/*
			raphael.path().attr({
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
					set: raphael.set(),
					'countries': {}
				};
				angular.forEach(countries, function(names, country_id) {
					data.cc[country_id] = continent_name;
					data.continents[continent_name].countries[country_id] = {
						country: names,
						slice: null,
						title: null,
						artists: {},
						set: raphael.set()
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
						if (expo.c) {
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
					}
				});

				nb_countries = $scope.countries.length;

				updateStatus(max_artists, nb_countries);

			}

			function updateStatus(nb_artists, nb_countries, in_country) {
				in_country = null;
				var txt, verb;
				switch ($scope.period) {
					case 'today':
						txt = "Actuellement";
						verb = "exposent";
						break;
					default:
						txt = "En " + $scope.period;
						verb = "exposaient";
						break;
				}
				txt += " " + nb_artists + " artistes<br /> " + verb + " dans " + nb_countries + " pays"
				angular.element('.status').html(txt);
			}

			function drawChart() {

				console.log("drawChart");

				console.log("nb_countries : " + nb_countries);
				console.log("max_artists : " + max_artists);

				var a = 360 / nb_countries;
				var rotation = 0;
				var layerW = ((divW / 2) - (central_radius + margin)) / max_artists;

				console.log("layerW : " + layerW);

				angular.forEach(data.continents, function(continent, continent_name) {
					console.log("->" + continent_name);

					nb_countries = 0;
					var continent_rotation = rotation;

					angular.forEach(continent.countries, function(country, country_code) {
						// console.log(country_code + ' (' + country.nb_artists + ')');

						var country_width = -(layerW * country.nb_artists);

						// filledArc : [ X Position, Y Position, Radius, Width, Angle, Rotation ]
						var filledArc = [originX, originY, central_radius, country_width, a, rotation];

						// console.log(filledArc);
						if (country.slice === null) {
							country.slice = raphael.path().attr({
								fill: '#FF0000',
								stroke: "#FFFFFF",
								'stroke-width': 1,
								filledArc: [originX, originY, central_radius, 0, a, rotation]
							}).animate({
								filledArc: filledArc
							}, animation_delay);

							country.slice.node.setAttribute('class', 'country-' + country_code);

							if (country.nb_artists) {

								// var simpleArc = [originX, originY, a, divW / 2 - continent_title_margin - country_title_margin, rotation - a / 2];
								var simpleArc = [originX, originY, divW / 2 - continent_title_margin - country_title_margin, a, rotation - a / 2];
								country.title_path = raphael.path().attr({
									stroke: "#0000FF",
									'stroke-width': 1,
									simpleArc: simpleArc
								});
								textOnPath(country_code, country.title_path, 12, 1, true, true, 0, '00FF00', 'normal');
							}

						} else {
							country.slice.animate({
								filledArc: filledArc
							}, animation_delay, null, function() {
								// console.log("animated");
							});
						}

						if (country.nb_artists) {
							// rotation += country.nb_artists ? a : 0;
							console.log(rotation);
							rotation += a;
							nb_countries++;
						}
					});

					if (nb_countries) {
						console.log("->" + continent_name);
						console.log(nb_countries + "countries");

						var continent_a = nb_countries * a;

						var simpleArc = [originX, originY, divW / 2 - continent_title_margin - country_title_margin - 100, continent_a, continent_rotation - continent_a / 2];

						var continent_title_path = raphael.path().attr({
							stroke: "#00FF00",
							'stroke-width': 1,
							simpleArc: simpleArc
						});
						textOnPath(continent_name, continent_title_path, 12, 1, true, true, 0, '00FF00', 'normal');
					}

				});

			}

			function textOnPath(message, path, fontSize, letterSpacing, kerning, geckoKerning, point, fontColor, fontWeight) {

				var fontFamily = "Open sans";

				var gecko = /rv:([^\)]+)\) Gecko\/\d{8}/.test(navigator.userAgent || '') ? true : false;
				var letters = [],
					places = [],
					messageLength = 0;

				for (var c = 0; c < message.length; c++) {

					var letter = raphael.text(0, 0, message[c]).attr({
						"text-anchor": "middle",
						"fill": fontColor,
						"font-weight": fontWeight
					});
					var character = letter.attr('text'),
						kern = 0;
					letters.push(letter);

					if (kerning) {

						if (gecko && geckoKerning) {
							kerning = geckoKerning;
						}

						var predecessor = letters[c - 1] ? letters[c - 1].attr('text') : '';

						if (kerning[c]) {

							kern = kerning[c];

						} else if (kerning[character]) {

							if (typeof kerning[character] === 'object') {
								kern = kerning[character][predecessor] || kerning[character]['default'] || 0;
							} else {
								kern = kerning[character];
							}
						}

						if (kerning['default']) {
							kern = kern + (kerning['default'][predecessor] || 0);
						}
					}

					messageLength += kern;
					places.push(messageLength);
					//spaces get a width of 0, so set min at 4px
					messageLength += Math.max(4.5, letter.getBBox().width);
				}

				if (letterSpacing) {
					if (gecko) {
						letterSpacing = letterSpacing * 0.83;
					}
				} else {
					letterSpacing = letterSpacing || path.getTotalLength() / messageLength;
				}
				fontSize = fontSize || 10 * letterSpacing;

				for (c = 0; c < letters.length; c++) {
					letters[c].attr({
						"font-size": fontSize + "px",
						"font-family": fontFamily
					});
					var p = path.getPointAtLength(places[c] * letterSpacing + point);
					var rotate = 'R' + (p.alpha < 180 ? p.alpha + 180 : p.alpha > 360 ? p.alpha - 360 : p.alpha) + ',' + p.x + ',' + p.y;
					letters[c].attr({
						x: p.x,
						y: p.y,
						transform: rotate
					}).toFront();

				}
			}

		}

	]);
});
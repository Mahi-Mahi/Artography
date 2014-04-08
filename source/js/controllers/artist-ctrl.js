/* global define */
"use strict";

define([], function() {

	return ['$scope', '$location', '$route', 'dataService',
		function($scope, $location, $route, dataService) {

			jQuery('body').removeClass('home');

			$scope.goBack = function() {
				window.history.back();
			};

			$scope.labels = {
				genre: {
					c: "Collectif",
					m: "Homme",
					f: "Femme"
				}
			};

			$scope.artist = dataService.data.artists[$route.current.params.id];

			$scope.periods = [];
			angular.forEach($scope.artist.expos, function(expo, year) {
				$scope.periods.push({
					name: parseInt(year, 10) ? year : "Aujourd'hui",
					slug: year,
					checked: null
				});
			});
			$scope.periods.reverse();

			// default period
			$scope.filters = {
				period: $route.current.params.period ? $route.current.params.period : 'today'
			};

			$scope.$watch('filters.period', function(value) {
				$scope.filters.period = value;
				dataService.getExpos($scope.filters.period).then(function() {
					update();
				});
			});

			var all_expos = {};

			// expos list
			$scope.expos = [];
			$scope.expos_list = [];
			// Countries list
			$scope.countries = [];
			$scope.organizers = {};
			$scope.organizers_list = [{
				name: 'TOTO',
				counter: 123
			}];

			var expo_colors = {
				'Temporary-Exhibition-Space': '#cccccc',
				'Public-Institution': '#00a79d',
				'Private-Gallery': '#ef4036',
				'Non-profit-organization': '#9e1e62',
				'Festival': '#8cc63e'
			}

			// incremented at each filters change
			var iteration = 0;

			var nb_countries = 0;
			var max_expos = 0;

			var mainWidth = jQuery('.content').width();
			var canvasW = mainWidth,
				divW = mainWidth,
				canvasH = mainWidth,
				divH = mainWidth;

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

			var central_radius = divW / 4 - 100;

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
						expos: {},
						set: chart.set()
					};
				});
			});

			function update() {
				parseData();
				drawChart();
				updateExpos();
			}

			var updateExpos = function() {
				$scope.expos_list = [];
				angular.forEach($scope.expos, function(expo_id) {
					$scope.expos_list.push(all_expos[expo_id]);
				});
				$scope.searchExpos();
			};

			$scope.searchExpos = function() {
				var i = 0;
				var re = new RegExp($scope.searchText, "i");
				angular.forEach($scope.expos_list, function(expo, idx) {
					if (re.test(expo.name)) {
						$scope.expos_list[idx].enabled = 'enabled' + (i++ % 2 === 0 ? ' even' : '');
					} else {
						$scope.expos_list[idx].enabled = '';
					}
				});
			};

			$scope.$apply();

			function parseData() {

				iteration++;

				if (!$scope.artist.expos[$scope.filters.period])
					return;

				var expos = $scope.artist.expos[$scope.filters.period];
				// console.log("expos : " + expos.length);

				$scope.expos = [];
				$scope.countries = [];
				$scope.organizers = {};
				max_expos = 0;

				angular.forEach(data.continents, function(continent, continent_name) {
					angular.forEach(continent.countries, function(country, country_code) {
						data.continents[continent_name].countries[country_code].has_expos = 0;
						data.continents[continent_name].countries[country_code].nb_expos = 0;
						// data.continents[continent_name].countries[country_code].rotation = 0;
					});
				});

				angular.forEach(expos, function(expo) {
					if (data.cc[expo.c]) {
						var country = data.continents[data.cc[expo.c]].countries[expo.c];
						var expos = country.expos;
						if (!expos[expo.i]) {
							expos[expo.i] = {
								slice: null,
								iteration: 0,
								showtype: expo.st.replace(/\s/g, '-'),
								type: expo.t.replace(/\s/g, '-'),
							};
							all_expos[expo.i] = {
								id: expo.i,
								showtype: expo.st.replace(/\s/g, '-'),
								type: expo.t.replace(/\s/g, '-'),
								period: [expo.d],
								organizer: expo.o,
								name: expo.n,
								city: expo.ct,
								country: country,
								enabled: 'enabled'
							};
						}
						if (expos[expo.i].iteration < iteration) {
							if (!country.nb_expos) {
								country.nb_expos = 1;
							} else {
								country.nb_expos++;
							}
							max_expos = Math.max(max_expos, country.nb_expos);
						}
						expos[expo.i].iteration = iteration;
						if ($scope.countries.indexOf(expo.c) == -1) {
							$scope.countries.push(expo.c);
						}
						if (!$scope.organizers[expo.t]) {
							$scope.organizers[expo.t] = {
								name: expo.t,
								counter: 1
							};
						} else {
							$scope.organizers[expo.t].counter++;
						}
						if ($scope.expos.indexOf(expo.i) == -1) {
							$scope.expos.push(expo.i);
						}
						country.has_expos = true;
						country.expos = expos;
						data.continents[data.cc[expo.c]].countries[expo.c] = country;
					} else {
						console.log("country continent not found : " + expo.c);
					}
				});

				nb_countries = $scope.countries.length;

				console.log($scope.organizers);

				updateStatus($scope.expos.length, nb_countries);

			}

			function updateStatus(nb_expos, nb_countries, in_country) {
				in_country = null;
				jQuery('.status').html("Actuellement " + nb_expos + " artistes<br /> exposent dans " + nb_countries + " pays");
			}

			function drawChart() {

				// console.log("nb_countries : " + nb_countries);
				// console.log("max_expos : " + max_expos);
				var layer_interval = Math.min(2, 10 / max_expos);

				var a = nb_countries == 1 ? 360 : (360 - (nb_countries * a_interval)) / nb_countries;
				var rotation = 0;

				var new_filledArc, previous_expo_filledArc;

				angular.forEach(data.continents, function(continent, continent_name) {
					// console.log("->" + continent_name);

					angular.forEach(continent.countries, function(country, country_code) {
						// console.log(country_code);

						var radius = central_radius;
						var previous_expo = null;

						angular.forEach(country.expos, function(expo, expo_id) {

							var layerW = expo.iteration < iteration ? 0 : divW / 3 / max_expos;

							if (layerW)
								radius += layerW + layer_interval;

							// filledArc : [ X Position, Y Position, Radius, Width, Angle, Rotation ]
							var previous_filledArc = expo.filledArc;
							expo.filledArc = [originX, originY, radius, layerW, a, rotation];

							if (expo.slice === null) {
								if (previous_expo) {
									new_filledArc = previous_expo_filledArc;
								} else {
									new_filledArc = [originX, originY, central_radius, layerW, a, country.rotation === undefined ? rotation : country.rotation];
								}

								var fill = expo_colors[expo.type];
								if (expo.showtype == 'Solo') {
									fill = "url(/assets/images/radio-checked.png)";
								}
								expo.slice = chart.path().attr({
									fill: fill,
									'stroke-width': 0,
									filledArc: new_filledArc
								}).animate({
									filledArc: expo.filledArc
								}, animation_delay)
									.hover(function() {
										var expo_id = this.node.classList[2].replace(/expo-/, '');
										var the_expo = all_expos[expo_id];
										if (the_expo) {
											jQuery('#popup').attr('class', 'expo-' + the_expo.type).html(
												'<p class="name">' + the_expo.name +
												'</p>' +
												'<p class="period">Du ' + the_expo.period[0] + ' Au ' + the_expo.period[1] + '</p>' +
												'<p class="period">Organisé par ' + the_expo.organizer + '</p>' +
												'<p class="place">@' + the_expo.city + ',' + the_expo.country + '</p>').stop().fadeIn();
										}
									}, function() {
										jQuery('#popup').stop().fadeOut();
									});

								expo.slice.node.setAttribute('class', 'country-' + country_code + ' expo expo-' + expo_id);

							} else {
								expo.slice.animate({
									filledArc: expo.filledArc
								}, animation_delay, null, function() {
									// console.log("animated");
								});
							}

							previous_expo_filledArc = previous_filledArc;

						});

						rotation += country.has_expos ? (a + a_interval) : 0;

						data.continents[continent_name].countries[country_code].rotation = country.rotation = rotation;
					});

				});

			}

		}

	];
});
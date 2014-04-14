/* global define */
"use strict";

define([], function() {

	return ['$scope', '$location', '$route', 'dataService',
		function($scope, $location, $route, dataService) {

			jQuery('body').removeClass('home').addClass('galerie');

			jQuery(window).off("debouncedresize")
				.on("debouncedresize", function(event) {
					$route.reload();
				});

			var currentMousePos = {
				x: -1,
				y: -1
			};
			jQuery(document).mousemove(function(event) {
				currentMousePos.x = event.pageX;
				currentMousePos.y = event.pageY;
			});

			$scope.goBack = function() {
				window.history.back();
			};

			$scope.gallery = dataService.data.galleries[$route.current.params.id];

			$scope.periods = [];
			angular.forEach($scope.gallery.fairs, function(fair, year) {
				$scope.periods.push({
					name: parseInt(year, 10) ? year : "Aujourd'hui",
					slug: year,
					checked: null
				});
			});
			$scope.periods.reverse();

			// default period
			$scope.filters = {
				period: $route.current.params.period ? $route.current.params.period : $scope.periods[0].slug
			};

			$scope.$watch('filters.period', function(value) {
				$scope.filters.period = value;
				dataService.getExpos($scope.filters.period).then(function() {
					update();
				});
			});

			var all_fairs = {};

			// fairs list
			$scope.fairs = [];
			$scope.fairs_list = [];
			// Countries list
			$scope.countries = [];

			// incremented at each filters change
			var iteration = 0;

			var nb_countries = 0;
			var max_fairs = 0;

			var central_radius = 60,
				central_margin = 20,
				country_title_margin = 30,
				margin = 10 + country_title_margin;

			var a_interval = 1;
			var animation_delay = 500,
				fadeOut_delay = 200,
				fadeIn_delay = 200;

			var delayed_display = [];

			var timeouts = {};

			var show_country_label = true;

			var nb_countries_total = 0;
			var textOnPathDone = 0;

			var mainWidth = jQuery('.content').width();
			var canvasW = mainWidth,
				divW = mainWidth,
				canvasH = mainWidth,
				divH = mainWidth;

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

			var central_radius = divW / 12;

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
						fairs: {},
						set: raphael.set()
					};
				});
			});

			function update() {
				parseData();
				drawChart();
				updateExpos();
			}

			var updateExpos = function() {
				$scope.fairs_list = [];
				angular.forEach($scope.fairs, function(fair_id) {
					console.log(all_fairs[fair_id]);
					$scope.fairs_list.push(all_fairs[fair_id]);
				});
				$scope.searchExpos();
			};

			$scope.searchExpos = function() {
				var i = 0;
				var re = new RegExp($scope.searchText, "i");
				angular.forEach($scope.fairs_list, function(fair, idx) {
					if (re.test(fair.name)) {
						$scope.fairs_list[idx].enabled = 'enabled' + (i++ % 2 === 0 ? ' even' : '');
					} else {
						$scope.fairs_list[idx].enabled = '';
					}
				});
			};

			$scope.$apply();

			function parseData() {

				iteration++;

				if (!$scope.gallery.fairs[$scope.filters.period])
					return;

				var fairs = $scope.gallery.fairs[$scope.filters.period];
				// console.log("fairs : " + fairs.length);

				$scope.fairs = [];
				$scope.countries = [];
				max_fairs = 0;

				angular.forEach(data.continents, function(continent, continent_name) {
					angular.forEach(continent.countries, function(country, country_code) {
						data.continents[continent_name].countries[country_code].has_fairs = 0;
						data.continents[continent_name].countries[country_code].nb_fairs = 0;
						// data.continents[continent_name].countries[country_code].rotation = 0;
					});
				});

				angular.forEach(fairs, function(fair) {
					if (data.cc[fair.c]) {
						var country = data.continents[data.cc[fair.c]].countries[fair.c];
						var fairs = country.fairs;
						if (!fairs[fair.i]) {
							fairs[fair.i] = {
								slice: null,
								iteration: 0,
								// showtype: fair.st.replace(/[^\w]+/g, '-').replace(/-$/, ''),
								// type: fair.t.replace(/[^\w]+/g, '-').replace(/-$/, ''),
							};
							all_fairs[fair.i] = {
								id: fair.i,
								// showtype: fair.st.replace(/[^\w]+/g, '-').replace(/-$/, ''),
								// type: fair.t.replace(/[^\w]+/g, '-').replace(/-$/, ''),
								period: [fair.d],
								name: fair.n,
								city: fair.ct,
								country: country,
								enabled: 'enabled'
							};
						}
						if (fairs[fair.i].iteration < iteration) {
							if (!country.nb_fairs) {
								country.nb_fairs = 1;
							} else {
								country.nb_fairs++;
							}
							max_fairs = Math.max(max_fairs, country.nb_fairs);
						}
						fairs[fair.i].iteration = iteration;
						if ($scope.countries.indexOf(fair.c) == -1) {
							$scope.countries.push(fair.c);
						}
						if ($scope.fairs.indexOf(fair.i) == -1) {
							$scope.fairs.push(fair.i);
						}
						country.has_fairs = true;
						country.fairs = fairs;
						data.continents[data.cc[fair.c]].countries[fair.c] = country;
					} else {
						console.log("country continent not found : " + fair.c);
					}
				});

				nb_countries = $scope.countries.length;

				updateStatus($scope.fairs.length, nb_countries);

			}

			function updateStatus(nb_fairs, nb_countries, in_country) {
				in_country = null;
				jQuery('.status').html("Actuellement " + nb_fairs + " galleryes<br /> fairsent dans " + nb_countries + " pays");
			}

			function drawChart() {

				// console.log("nb_countries : " + nb_countries);
				// console.log("max_fairs : " + max_fairs);
				var layer_interval = Math.min(2, 10 / max_fairs);

				var a = nb_countries == 1 ? 360 : (360 - (nb_countries * a_interval)) / nb_countries;
				var rotation = 0;
				textOnPathDone = 0;

				var new_filledArc, previous_fair_filledArc;

				angular.forEach(delayed_display, function(item, idx) {
					delete delayed_display[idx];
					item.remove();
				});

				angular.forEach(data.continents, function(continent, continent_name) {
					// console.log("->" + continent_name);

					angular.forEach(continent.countries, function(country, country_code) {
						// console.log(country_code);

						var radius = central_radius;
						var previous_fair = null;

						angular.forEach(country.fairs, function(fair, fair_id) {

							var layerW = fair.iteration < iteration ? 0 : ((divW / 2) - (central_radius + margin)) / (max_fairs + 1);
							// var layerW = max_galleries ? ((divW / 2) - (central_radius + margin)) / max_galleries : 0;

							if (layerW)
								radius += layerW + layer_interval;

							// filledArc : [ X Position, Y Position, Radius, Width, Angle, Rotation ]
							var previous_filledArc = fair.filledArc;
							fair.filledArc = [originX, originY, radius, layerW, a, rotation];

							if (fair.slice === null) {
								if (previous_fair) {
									new_filledArc = previous_fair_filledArc;
								} else {
									new_filledArc = [originX, originY, central_radius, 0 /* layerW */ , a, country.rotation === undefined ? rotation : country.rotation];
								}
								console.log(new_filledArc);

								fair.slice = raphael.path().attr({
									fill: '#000',
									'stroke-width': 0,
									filledArc: new_filledArc
								}).animate({
									filledArc: fair.filledArc
								}, animation_delay)
									.hover(function() {
										var fair_id = this.node.classList[2].replace(/fair-/, '');
										var the_fair = all_fairs[fair_id];
										if (the_fair) {
											console.log(the_fair);
											jQuery('#popup').attr('class', 'fair-' + the_fair.type).html(
												'<p class="name">' + the_fair.name + '</p>' +
												'<p class="period">Du ' + the_fair.period[0] +
												(the_fair.period[1] ? (' Au ' + the_fair.period[1]) : '') + '</p>' +
												'<p class="period">Organisé par ' + the_fair.organizer + '</p>' +
												'<p class="place">@' + the_fair.city + ',' + the_fair.country.country.fr + '</p>')
												.stop()
												.css({
													left: currentMousePos.x - 200,
													top: currentMousePos.y - 200
												})
												.fadeIn();
										}
									}, function() {
										jQuery('#popup').stop().fadeOut();
									});

								fair.slice.node.setAttribute('class', 'country-' + country_code + ' fair fair-' + fair_id);

							} else {
								fair.slice.animate({
									filledArc: fair.filledArc
								}, animation_delay, null, function() {
									// console.log("animated");
								});
							}

							previous_fair_filledArc = previous_filledArc;

						});

						rotation += country.has_fairs ? (a + a_interval) : 0;

						data.continents[continent_name].countries[country_code].rotation = country.rotation = rotation;

						// Country Label
						if (show_country_label) {
							if (country.title_set) {
								country.title_set.remove();
							}
							if (country.title_path) {
								country.title_path.remove();
							}
							if (country.has_fairs) {
								(function(country, country_code, a, rotation) {
									clearTimeout(timeouts[country_code]);
									timeouts[country_code] = setTimeout(function() {
										// var simpleArc = [originX, originY, a, divW / 2 - country_title_margin, rotation - a / 2];
										var simpleArc = [originX, originY, divW / 2 - country_title_margin, a - a_interval, rotation];
										country.title_path = raphael.path().attr({
											stroke: "#0000FF",
											'stroke-width': 0,
											simpleArc: simpleArc,
											opacity: 0
										});

										// var message = country_code.toUpperCase();
										// var res = prepareText(country.country.fr.toUpperCase(), 12, 1, true, true, '00FF00', 'normal');
										// message = (res.messageLength > country.title_path.getTotalLength() * 0.75) ? message : country.country.fr.toUpperCase();
										if (nb_countries > 10) {
											country.title_set = textOnPath(country_code.toUpperCase(), country.title_path, 10, 1, true, true, 0, '00FF00', 'normal', a, rotation);
										} else {
											country.title_set = textOnPath(country.country.fr.toUpperCase(), country.title_path, 12, 1, true, true, 0, '00FF00', 'normal', a, rotation);
										}

										delayed_display.push(country.title_path);

									}, 150);
								})(country, country_code, a, rotation);
							}
						}

					});

				});

			}

			function prepareText(message, fontSize, letterSpacing, kerning, geckoKerning, fontColor, fontWeight) {
				// var fontFamily = "Open sans";

				var gecko = /rv:([^\)]+)\) Gecko\/\d{8}/.test(navigator.userAgent || '') ? true : false;
				var letters = [],
					places = [],
					messageLength = 0;

				for (var c = 0; c < message.length; c++) {

					var letter = raphael.text(0, 0, message[c]).attr({
						"text-anchor": "bottom",
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

				return {
					letters: letters,
					places: places,
					messageLength: messageLength
				};
			}

			function textOnPath(message, path, fontSize, letterSpacing, kerning, geckoKerning, point, fontColor, fontWeight, a, rotation) {
				var set = raphael.set();
				delayed_display.push(set);

				var fontFamily = "Open sans";
				var gecko = /rv:([^\)]+)\) Gecko\/\d{8}/.test(navigator.userAgent || '') ? true : false;
				var c, reverse;
				var res = prepareText(message, fontSize, letterSpacing, kerning, geckoKerning, fontColor, fontWeight);
				var letters = res.letters,
					places = res.places,
					messageLength = res.messageLength;

				point = (path.getTotalLength() - messageLength) / 2;
				letterSpacing = 1;
				letterSpacing += ((path.getTotalLength() - messageLength) / 2) / 200;

				if (letterSpacing) {
					if (gecko) {
						letterSpacing = letterSpacing * 0.83;
					}
				} else {
					letterSpacing = letterSpacing || path.getTotalLength() / messageLength;
				}
				fontSize = fontSize || 10 * letterSpacing;

				rotation = rotation % 360;

				if ((Math.abs(rotation) + a <= 90 || Math.abs(rotation) + a >= 270) && a < 360) {
					message = message.split("").reverse().join("");
					res = prepareText(message, fontSize, letterSpacing, kerning, geckoKerning, fontColor, fontWeight);
					letters = res.letters;
					places = res.places;
					messageLength = res.messageLength;
					reverse = true;
				}

				for (c = 0; c < letters.length; c++) {
					letters[c].attr({
						"font-size": fontSize + "px",
						"font-family": fontFamily
					});
					var p = path.getPointAtLength(places[c] * letterSpacing + point);
					var R = p.alpha;
					if (p.alpha < 180)
						R = p.alpha % 180 + 180;
					if (reverse)
						R = p.alpha - 180;
					// console.log([message[c], reverse, p.alpha, R]);
					var rotate = 'R' + R + ',' + p.x + ',' + p.y;
					set.push(letters[c].attr({
							x: p.x,
							y: p.y,
							transform: rotate,
							opacity: 0
						})
						.toFront());

				}
				textOnPathDone++;
				if (textOnPathDone == nb_countries) {
					console.log("all textOnPathDone");
					angular.forEach(delayed_display, function(item, idx) {
						delete delayed_display[idx];
						item.animate({
							opacity: 1
						}, fadeIn_delay);
					});
				}
				return set;
			}

		}

	];
});
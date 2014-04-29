/* global define */
"use strict";

define([], function() {

	return ['$scope', '$location', '$route', 'dataService',
		function($scope, $location, $route, dataService) {

			jQuery('body').removeClass('home').removeClass('galerie');

			jQuery(window).off("debouncedresize")
				.on("debouncedresize", function(event) {
					$route.reload();
					adaptSidebarFormHeight();
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
				period: $route.current.params.period ? $route.current.params.period : $scope.periods[0].slug
			};

			$scope.$watch('filters.period', function(value) {
				$scope.filters.period = value;
				dataService.getExpos($scope.filters.period).then(function() {
					update();
				});
			});

			var all_expos = {};

			var expo_types = [];

			// expos list
			$scope.expos = [];
			$scope.expos_list = [];
			// Countries list
			$scope.countries = [];
			$scope.organizers = {};
			// $scope.organizers_list = [{
			// 	name: 'TOTO',
			// 	counter: 123
			// }];
			var expo_colors = {
				'Biennial-Triennial-etc': '#cccccc',
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

			var central_radius = 60,
				central_margin = 20,
				country_title_margin = 30,
				margin = 10 + country_title_margin;

			var layerW_max = 20;
			var delayed_display = [];

			var timeouts = {};

			var show_country_label = true;

			var nb_countries_total = 0;
			var textOnPathDone = 0;

			var scale_circles = [];
			angular.forEach([2, 5, 10, 25, 50, 100, 250, 500], function(value, key) {
				scale_circles[key] = {
					val: value
				};
			});

			var mainWidth = jQuery('.content').width();
			var canvasW = mainWidth,
				divW = mainWidth,
				canvasH = mainWidth,
				divH = mainWidth;

			var raphael = new Raphael(document.getElementById('canvas'), canvasW, canvasH);

			jQuery('#canvas').on('mouseout', function() {
				jQuery("#popup").stop().fadeOut();
			});

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

			var animation_delay = 300,
				a_interval = 2,
				fadeOut_delay = 200,
				fadeIn_delay = 200;

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
						expos: {},
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
								showtype: expo.st.replace(/[^\w]+/g, '-').replace(/-$/, ''),
								type: expo.t.replace(/[^\w]+/g, '-').replace(/-$/, ''),
							};
							all_expos[expo.i] = {
								id: expo.i,
								showtype: expo.st.replace(/[^\w]+/g, '-').replace(/-$/, ''),
								type: expo.t.replace(/[^\w]+/g, '-').replace(/-$/, ''),
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
								counter: 1,
								slug: expo.t.replace(/[^\w]+/g, '-').replace(/-$/, '')
							};
						} else {
							$scope.organizers[expo.t].counter++;
						}
						if ($scope.expos.indexOf(expo.i) == -1) {
							$scope.expos.push(expo.i);
						}
						if (expo_types.indexOf(expo.st) == -1) {
							expo_types.push(expo.st);
						}

						country.has_expos = true;
						country.expos = expos;
						data.continents[data.cc[expo.c]].countries[expo.c] = country;
					} else {
						console.log("country continent not found : " + expo.c);
					}
				});

				console.log(expo_types);

				nb_countries = $scope.countries.length;

				console.log($scope.organizers);

				updateStatus($scope.expos.length, nb_countries);

			}

			function updateStatus(nb_expos, nb_countries, in_country) {
				in_country = null;
				var verb, period, expositions, countries;
				switch ($scope.filters.period) {
					case 'today':
						period = "Actuellement";
						verb = "exposent";
						break;
					default:
						period = "En " + $scope.filters.period;
						verb = "exposaient";
						break;
				}
				switch (nb_expos) {
					case 1:
						expositions = "une exposition";
						break;
					default:
						expositions = nb_expos + " expositions";
						break;
				}
				switch (nb_countries) {
					case 1:
						countries = "un pays";
						break;
					default:
						countries = nb_countries + " pays";
						break;
				}

				jQuery('.entry-description p').html('<strong>' + period + ',</strong> cet artiste <br />' + verb + ' dans <strong>' + countries + '</strong>' + '<br /> via <strong> ' + expositions + ' </strong>.');

				// "<strong>En {{period}},</strong> cet artiste <br />a exposé dans <strong>{{nb_countries}} pays</strong> <br />via <strong>{{nb_expos}} expositions</strong>";
			}

			function drawChart() {

				// console.log("nb_countries : " + nb_countries);
				// console.log("max_expos : " + max_expos);
				var layer_interval = Math.min(2, 10 / max_expos);

				var a = nb_countries == 1 ? 360 : (360 - (nb_countries * a_interval)) / nb_countries;
				var rotation = 0;
				textOnPathDone = 0;

				var new_filledArc, previous_expo_filledArc, real_layerW;

				angular.forEach(delayed_display, function(item, idx) {
					delete delayed_display[idx];
					item.remove();
				});

				angular.forEach(data.continents, function(continent, continent_name) {
					// console.log("->" + continent_name);

					angular.forEach(continent.countries, function(country, country_code) {
						// console.log(country_code);

						var radius = central_radius;
						var previous_expo = null;

						angular.forEach(country.expos, function(expo, expo_id) {

							var layerW = Math.min(layerW_max, expo.iteration < iteration ? 0 : ((divW / 2) - (central_radius + margin)) / (max_expos + 1));
							// var layerW = max_artists ? ((divW / 2) - (central_radius + margin)) / max_artists : 0;

							if (layerW)
								real_layerW = layerW;

							if (layerW)
								radius += layerW + layer_interval;

							// filledArc : [ X Position, Y Position, Radius, Width, Angle, Rotation ]
							var previous_filledArc = expo.filledArc;
							expo.filledArc = [originX, originY, radius, layerW, a, rotation];

							if (expo.slice === null) {
								if (previous_expo) {
									new_filledArc = previous_expo_filledArc;
								} else {
									new_filledArc = [originX, originY, central_radius, 0 /* layerW */ , a, country.rotation === undefined ? rotation : country.rotation];
								}

								var fill = expo_colors[expo.type];
								if (expo.showtype == 'Solo') {
									fill = "url(/arts-visuels/assets/images/stripe-" + (expo.type.replace(/expo-/, '')) + ".png)";
									console.log(fill);
								}
								expo.slice = raphael.path().attr({
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
												'<p class="name">' + the_expo.name + '</p>' +
												'<p class="period">Du ' + the_expo.period[0] +
												(the_expo.period[1] ? (' Au ' + the_expo.period[1]) : '') + '</p>' +
												'<p class="period">Organisé par ' + the_expo.organizer + '</p>' +
												'<p class="place">@' + the_expo.city + ',' + the_expo.country.country.fr + '</p>')
												.stop()
												.css({
													left: currentMousePos.x + 0,
													top: currentMousePos.y + 0
												})
												.fadeIn();
											jQuery('#popup').on('mouseout', function() {
												jQuery(this).stop().fadeOut();
											});
										}
									}, function() {});

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

						// Country Label
						if (show_country_label) {
							if (country.title_set) {
								country.title_set.remove();
							}
							if (country.title_path) {
								country.title_path.remove();
							}
							if (country.has_expos) {
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
										}).toBack();

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

				angular.forEach(scale_circles, function(scale, idx) {
					console.log("real_layerW : " + real_layerW);
					var r = Math.max(0, Math.min(divW / 2, central_radius + real_layerW * scale.val));
					var y = Math.max(0, Math.min(originY - central_radius, originY - central_radius - real_layerW * scale.val));
					if (scale_circles[idx].circle) {
						scale_circles[idx].circle.animate({
							r: r
						}, animation_delay);
						scale_circles[idx].legend.animate({
							x: originX + 10,
							y: y
						}, animation_delay);
					} else {
						scale_circles[idx].circle = raphael.circle(originX, originY, r).attr({
							opacity: 0.2,
							'stroke-dasharray': ['.'],
							stroke: '#000000',
							'stroke-width': 1
						}).toBack();
						scale_circles[idx].legend = raphael.text(originX + 10, y, scale.val).attr({
							fill: '#000000',
							'font-weight': 20
						});
					}
					if (scale_circles[idx].val > max_expos || scale_circles[idx].val < max_expos / 10) {
						scale_circles[idx].circle.animate({
							opacity: 0
						}, animation_delay);
						scale_circles[idx].legend.animate({
							opacity: 0
						}, animation_delay);
					} else {
						scale_circles[idx].circle.animate({
							opacity: 0.2
						}, animation_delay);
						scale_circles[idx].legend.animate({
							opacity: 1
						}, animation_delay);
					}
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
			jQuery('.expandable').on('click', function() {
				jQuery(this).toggleClass('expandable-close');
				jQuery(this).parent().find('.js-expandable').slideToggle('slow');
			});

			var adaptSidebarFormHeight = function() {
				var sidebarLeftFormHeight = jQuery(window).height() - (jQuery('.entry-header').height() + jQuery('.left-sidebar > section').height() + 170);
				var sidebarRightFormHeight = jQuery(window).height() - (jQuery('.entry-description').height() + 100);
				jQuery('.sidebar-form').css('height', sidebarLeftFormHeight);
				jQuery('.sidebar-form-right').find('ul').css('height', sidebarRightFormHeight);
			};

			adaptSidebarFormHeight();
		}

	];
});
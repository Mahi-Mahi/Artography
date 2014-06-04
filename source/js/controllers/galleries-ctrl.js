/* global define */
"use strict";

define([], function() {

	return ['$scope', '$location', '$route', 'dataService',
		function($scope, $location, $route, dataService) {

			jQuery('body').removeClass('home').addClass('galerie');

			jQuery(window).off("debouncedresize")
				.on("debouncedresize", function(event) {
					$route.reload();
					adaptSidebarFormHeight();
				});

			$scope.currentMousePos = {
				x: -1,
				y: -1
			};
			jQuery(document).mousemove(function(event) {
				// console.log([event.pageX, event.pageY]);
				$scope.currentMousePos.x = event.pageX;
				$scope.currentMousePos.y = event.pageY;
			});

			$scope.goBack = function() {
				// window.history.back();
				document.location = '/';
			};

			var years = dataService.data.years;

			// Galleries list
			$scope.galleries = [];
			angular.forEach(dataService.data.galleries.names, function(gallery_name, id) {
				$scope.galleries.push({
					id: parseInt(id, 10),
					name: gallery_name,
					enabled: ''
				});
			});

			$scope.galleries.sort(
				function(a, b) {
					return (a.name < b.name ? -1 : 1);
					// return (a.id < b.id ? -1 : 1);
				}
			);

			// default period
			$scope.filters = {
				gallery: '',
				period: '2013'
			};

			$scope.periods = [];

			angular.forEach(years, function(year) {
				$scope.periods.push({
					name: year,
					slug: year,
					checked: null
				});
			});
			if ($route.current.params.period)
				$scope.filters.period = $route.current.params.period;

			$scope.$watch('filters.period', function(value) {
				$scope.filters.period = value;
				dataService.getFairs($scope.filters.period).then(function() {
					update();
				});
			});

			$scope.updateFilters = function() {
				update();
			};

			// Countries list
			$scope.countries = [];

			// incremented at each filters change
			var iteration = 0;

			var nb_countries = 0;
			var max_galleries = 0;
			var active_galleries;

			var scale_circles = [];
			angular.forEach([2, 5, 10, 25, 50, 100, 250, 500], function(value, key) {
				scale_circles[key] = {
					val: value
				};
			});

			var mainWidth = Math.min(jQuery('.content').width(), jQuery(window).height() - jQuery('.entry-header').height());
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

			var central_radius = 60,
				central_margin = 20,
				continent_title_margin = 10,
				country_title_margin = 30,
				margin = 10 + continent_title_margin + country_title_margin;

			var a_interval = 1;
			var animation_delay = 500,
				fadeOut_delay = 200,
				fadeIn_delay = 200;

			var delayed_display = [];

			var timeouts = {};

			var show_continent_label = false,
				show_country_label = true;

			var nb_countries_total = 0;
			var textOnPathDone = 0;

			var logo_ratio = 168 / 288,
				logo_margin = 12,
				logo_width = central_radius + logo_margin,
				logo_height = (central_radius * logo_ratio) + logo_margin;

			raphael.circle(originX, originY, central_radius).attr({
				fill: '#FFF',
				opacity: 1,
				'stroke-width': 0
			}).toFront();

			raphael.image("/arts-visuels/assets/images/Logo-IFdata.png", originX - logo_width / 2, originY - logo_height / 2, logo_width, logo_height);

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
						galleries: {},
						set: raphael.set()
					};
				});
			});

			$scope.$apply();

			// setInterval(function() {
			// 	angular.forEach(delayed_display, function(item, idx) {
			// 		delete delayed_display[idx];
			// 		item.animate({
			// 			opacity: 1
			// 		}, fadeIn_delay);
			// 	});
			// }, 50);

			function update() {
				parseData();
				updateGalleries();
				drawChart();
			}

			function parseData() {

				iteration++;

				var fairs = dataService.data.fairs[$scope.filters.period];

				$scope.countries = [];
				max_galleries = 0;
				active_galleries = [];

				angular.forEach(data.continents, function(continent, continent_name) {
					angular.forEach(continent.countries, function(country, country_code) {
						data.continents[continent_name].countries[country_code].has_galleries = 0;
						data.continents[continent_name].countries[country_code].nb_galleries = 0;
						// data.continents[continent_name].countries[country_code].rotation = 0;
					});
				});

				angular.forEach(fairs, function(fair) {
					if (fair.c && fair.c != 'FR') {
						var country = data.continents[data.cc[fair.c]].countries[fair.c];
						var galleries = country.galleries;
						if (!galleries[fair.i]) {
							galleries[fair.i] = {
								slice: null,
								iteration: 0
							};
						}
						if (galleries[fair.i].iteration < iteration) {
							if (!country.nb_galleries) {
								country.nb_galleries = 1;
							} else {
								country.nb_galleries++;
							}
							max_galleries = Math.max(max_galleries, country.nb_galleries);
						}
						galleries[fair.i].iteration = iteration;
						if ($scope.countries.indexOf(fair.c) == -1) {
							$scope.countries.push(fair.c);
						}
						if (active_galleries.indexOf(fair.i) == -1) {
							active_galleries.push(parseInt(fair.i, 10));
						}
						country.has_galleries = true;
						country.galleries = galleries;
						data.continents[data.cc[fair.c]].countries[fair.c] = country;
					}

				});

				nb_countries = $scope.countries.length;

				updateStatus(active_galleries.length, nb_countries);

			}

			function updateStatus(nb_galleries, nb_countries, in_country) {
				in_country = null;
				var verb, period, galleries, countries;
				switch ($scope.filters.period) {
					case 'today':
						period = "Aujourd'hui";
						verb = "exposent";
						break;
					default:
						period = "En " + $scope.filters.period;
						verb = "ont<br />exposé";
						break;
				}
				switch (nb_galleries) {
					case 0:
						galleries = "aucun galerie";
						verb = "n'" + verb;
						break;
					case 1:
						galleries = "1 galerie";
						verb = "fairse";
						break;
					default:
						galleries = nb_galleries + " galeries";
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

				jQuery('.entry-description p').html('<strong>' + period + '</strong>, <strong>' + galleries + '</strong><br /> françaises ' + verb + (nb_galleries ? ' dans <strong>' + countries + '</strong>' : '') + '.');
			}

			$scope.showGallery = function(gallery_id) {
				// $location.path('/arts-visuels/galerie/' + gallery_id);
				console.log('/arts-visuels/galerie/' + gallery_id);
				document.location = '/arts-visuels/galerie/' + gallery_id;
			};

			$scope.updateGalleries = function() {
				updateGalleries();
			};

			function updateGalleries() {
				console.log("updateGalleries");
				var i = 0;
				var re = new RegExp($scope.searchText, "i");
				console.log(active_galleries);
				angular.forEach($scope.galleries, function(gallery, idx) {
					if (active_galleries.indexOf(gallery.id) !== -1 && re.test(gallery.name)) {
						$scope.galleries[idx].enabled = 'enabled' + (i++ % 2 === 0 ? ' even' : '');
					} else {
						$scope.galleries[idx].enabled = '';
					}
				});
				sortGalleries();
			}

			function sortGalleries() {
				jQuery('.galleries-list').hide();

				var li = jQuery('.galleries-list li').get();

				li.sort(function(a, b) {
					a = jQuery(a).text();
					b = jQuery(b).text();

					return (a < b) ? -1 : ((a > b) ? 1 : 0);
				});

				jQuery('.galleries-list').append(li);

				jQuery('.galleries-list').show();

			}

			function drawChart() {

				console.log("nb_countries : " + nb_countries);
				console.log("max_galleries : " + max_galleries);

				var a = nb_countries ? 360 / nb_countries : 0;
				var rotation = 0;
				var layerW = max_galleries ? ((divW / 2) - (central_radius + margin)) / max_galleries : 0;
				textOnPathDone = 0;

				angular.forEach(delayed_display, function(item, idx) {
					delete delayed_display[idx];
					item.remove();
				});

				angular.forEach(data.continents, function(continent, continent_name) {

					nb_countries_total = 0;
					var continent_rotation = rotation;

					angular.forEach(continent.countries, function(country, country_code) {

						var country_width = -(layerW * country.nb_galleries);

						// filledArc : [ X Position, Y Position, Radius, Width, Angle, Rotation ]
						var filledArc = [originX, originY, central_radius, country_width, a - a_interval, rotation];

						if (country.slice === null) {
							country.slice = raphael.path().attr({
								fill: '#000000',
								stroke: '#FFFFFF',
								'stroke-width': 0,
								filledArc: [originX, originY, central_radius, 0, a - a_interval, rotation]
							}).toBack().animate({
								filledArc: filledArc
							}, animation_delay)
								.hover(function() {
									console.log(this.node.classList);
									var country_id = this.node.classList[0].replace(/country-/, '');
									$scope.showCountryPopup(country_id);
								}, function() {});

							country.slice.node.setAttribute('class', 'country-' + country_code);

						} else {
							country.slice.animate({
								filledArc: filledArc
							}, animation_delay, null, function() {
								// console.log("animated");
							});
						}

						// Country Label
						if (show_country_label) {
							if (country.title_set) {
								country.title_set.remove();
							}
							if (country.title_path) {
								country.title_path.remove();
							}
							if (country.nb_galleries) {
								(function(country, country_code, a, rotation) {
									clearTimeout(timeouts[country_code]);
									timeouts[country_code] = setTimeout(function() {
										// var simpleArc = [originX, originY, a, divW / 2 - continent_title_margin - country_title_margin, rotation - a / 2];
										var simpleArc = [originX, originY, divW / 2 - continent_title_margin - country_title_margin, a - a_interval, rotation];
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

						if (country.nb_galleries) {
							// rotation += country.nb_galleries ? a : 0;
							rotation += a;
							nb_countries_total++;
						}
					});

					// Continent label
					if (show_continent_label) {
						if (continent.title_set) {
							continent.title_set.animate({
								opacity: 0
							}, fadeOut_delay, function() {
								this.remove();
							});
						}
						if (continent.title_path) {
							continent.title_path.animate({
								opacity: 0
							}, fadeOut_delay, function() {
								this.remove();
							});
						}

						if (nb_countries_total) {

							var continent_a = nb_countries_total * a;

							(function(continent, continent_name, continent_a, continent_rotation) {
								clearTimeout(timeouts[continent_name]);
								timeouts[continent_name] = setTimeout(function() {

									var simpleArc = [originX, originY, divW / 2 - continent_title_margin, continent_a - a_interval, continent_rotation];

									continent.title_path = raphael.path().attr({
										stroke: "#00FF00",
										'stroke-width': 2,
										simpleArc: simpleArc
									});
									var res = prepareText(continent_name, 12, 1, true, true, '00FF00', 'normal');
									var message = (res.messageLength > continent.title_path.getTotalLength() * 0.75) ? continent_name.substr(0, 3) : continent_name;
									continent.title_set = textOnPath(message, continent.title_path, 12, 1, true, true, 0, '00FF00', 'normal', continent_a, continent_rotation);
									delayed_display.push(continent.title_path);
								}, 100);
							})(continent, continent_name, continent_a, continent_rotation);

						}
					}

					angular.forEach(scale_circles, function(scale, idx) {
						var r = Math.max(0, Math.min(divW / 2, central_radius + layerW * scale.val));
						var y = Math.max(0, Math.min(originY - central_radius, originY - central_radius - layerW * scale.val));
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
								stroke: "#000000",
								'stroke-width': 1
							}).toBack();
							scale_circles[idx].legend = raphael.text(originX + 10, y, scale.val).attr({
								fill: '#000000',
								'font-weight': 20
							});
						}
						if (scale_circles[idx].val > max_galleries || scale_circles[idx].val < max_galleries / 10) {
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

			$scope.showCountryPopup = function(country_id) {
				console.log("showCountryPopup(" + country_id);

				var continent_name = data.cc[country_id];
				var country = data.continents[continent_name].countries[country_id];

				jQuery('#popup').html('<p class="period"> En ' + $scope.filters.period + ', les artistes français ont exposé dans ' + country.nb_galleries + ' galeries ' + country.country.fr_prefix + ' ' + country.country.fr + '</p>')
					.stop()
					.fadeIn();

				var mouse_position = {
					top: ($scope.currentMousePos.y - 50) + 'px',
					left: ($scope.currentMousePos.x - 300) + 'px'
				};
				jQuery('#popup').css(mouse_position);
				jQuery('#popup').on('mouseout', function() {
					jQuery(this).stop().fadeOut();
				});

			};

			jQuery('.expandable').on('click', function() {
				jQuery(this).toggleClass('expandable-close');
				jQuery(this).parent().find('.js-expandable').slideToggle('slow');
			});

			var adaptSidebarFormHeight = function() {
				var sidebarLeftFormHeight = jQuery(window).height() - (jQuery('.entry-header').outerHeight() + jQuery('.left-sidebar > section').outerHeight() + 170);
				var sidebarRightFormHeight = jQuery(window).height() - (jQuery('.entry-description').outerHeight() + 100) - (jQuery('.about').outerHeight() + 10);
				jQuery('.sidebar-form').css('height', sidebarLeftFormHeight);
				jQuery('.sidebar-form-right').find('ul').css('height', sidebarRightFormHeight);
			};

			adaptSidebarFormHeight();
		}

	];
});
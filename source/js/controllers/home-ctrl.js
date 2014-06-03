/* global define */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', '$location', '$route', 'dataService', 'langService',
		function($scope, $rootScope, $location, $route, dataService, langService) {

			jQuery('body').addClass('home');

			dataService.init('artist');

			langService.init();
			$scope.setLang = function(lang) {
				langService.setLang(lang);
				$route.reload();
			};

			function updateStatus() {
				var verb, period, artists, galleries, countries;

				// Artists
				period = $rootScope.lang === 'fr' ? "Aujourd'hui" : "Today";
				verb = $rootScope.lang === 'fr' ? "exposent" : "exhibits";
				switch (dataService.data.today.expos.artists.length) {
					case 0:
						artists = $rootScope.lang === 'fr' ? "aucun artiste</strong> français" : "no french<strong> artist";
						verb = $rootScope.lang === 'fr' ? "n'" + verb : verb;
						break;
					case 1:
						artists = "1 artiste";
						verb = $rootScope.lang === 'fr' ? "expose" : "exhibit";
						break;
					default:
						artists = dataService.data.today.expos.artists.length + ($rootScope.lang === 'fr' ? " artistes</strong> français" : " french</strong> artists");
						break;
				}
				switch (dataService.data.today.expos.countries.length) {
					case 1:
						countries = $rootScope.lang === 'fr' ? "un pays" : "one country";
						break;
					default:
						countries = dataService.data.today.expos.countries.length + ($rootScope.lang === 'fr' ? " pays" : " countries");
						break;
				}

				var text = '<strong>' + period + '<br />' + artists + ' <br />' + verb + (dataService.data.today.expos.artists.length ? ($rootScope.lang === 'fr' ? ' dans ' : ' in ') + '<br /><strong>' + countries + '.</strong>' : '') + '';

				jQuery('.home-artist h2').html(text);

				// Galleries
				period = $rootScope.lang === 'fr' ? "En 2014" : "In 2014";
				verb = $rootScope.lang === 'fr' ? "exposent" : "exhibits";
				switch (dataService.data.today.fairs.galleries.length) {
					case 0:
						galleries = $rootScope.lang === 'fr' ? "aucune galerie</strong><br /> françaises" : "no french</strong><br /> gallery";
						verb = "n'" + verb;
						break;
					case 1:
						galleries = $rootScope.lang === 'fr' ? "1 galerie</strong><br /> françaises" : "1 french</strong><br />gallery";
						verb = $rootScope.lang === 'fr' ? "expose" : "exhibit";
						break;
					default:
						galleries = dataService.data.today.fairs.galleries.length + ($rootScope.lang === 'fr' ? " galeries</strong><br />françaises" : " french</strong><br />galleries");
						break;
				}
				switch (dataService.data.today.fairs.countries.length) {
					case 1:
						countries = $rootScope.lang === 'fr' ? " un pays" : " one country";
						break;
					default:
						countries = dataService.data.today.fairs.countries.length + ($rootScope.lang === 'fr' ? " pays" : " countries");
						break;
				}

				var text = '<strong>' + period + '</strong> <br /><strong>' + galleries + '  ' + verb + '<br />' + (dataService.data.today.fairs.galleries.length ? ' ' + ($rootScope.lang === 'fr' ? 'dans' : 'in') + ' <strong>' + countries + '.</strong>' : '') + '';

				jQuery('.home-galerie h2').html(text);
			}

			updateStatus();

		}];
});
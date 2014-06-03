/* global define */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', '$location', '$route', 'dataService',
		function($scope, $rootScope, $location, $route, dataService) {

			jQuery('body').addClass('home');

			dataService.init('artist');

			$scope.setLang = function(lang) {
				$rootScope.lang = lang;
				jQuery('body').removeClass('lang-fr').removeClass('lang-en');
				jQuery('body').addClass('lang-' + lang);
			};
			$scope.setLang('fr');

		}];
});
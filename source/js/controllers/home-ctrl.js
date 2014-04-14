/* global define */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', '$location', '$route', 'dataService', 'ngProgress', function($scope, $rootScope, $location, $route, dataService, ngProgress) {

		jQuery('body').addClass('home');

		// ngProgress.start();
		dataService.init('artist');

	}];
});
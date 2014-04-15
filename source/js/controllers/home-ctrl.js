/* global define */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', '$location', '$route', 'dataService',
		function($scope, $rootScope, $location, $route, dataService) {

			jQuery('body').addClass('home');

			dataService.init('artist');

		}];
});
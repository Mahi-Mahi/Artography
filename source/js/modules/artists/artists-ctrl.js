/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function(controllers) {
	'use strict';

	controllers.controller('ArtistsController', ['$scope',
		function($scope) {
			$scope.twoTimesTwo = 2 * 2;
		}
	]);
});
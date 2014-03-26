define(['angular', 'services'], function(angular) {
	'use strict';

	/* Controllers */

	return angular.module('myApp.controllers', ['myApp.services'])

	.controller('homeController', ['$scope', '$injector',
		function($scope, $injector) {
			require(['controllers/home-ctrl'], function(homeController) {
				$injector.invoke(homeController, this, {
					'$scope': $scope
				});
			});
		}
	])

	.controller('artistsController', ['$scope', '$injector',
		function($scope, $injector) {
			require(['controllers/artists-ctrl'], function(artistsController) {
				$injector.invoke(artistsController, this, {
					'$scope': $scope
				});
			});
		}
	])

	.controller('artistController', ['$scope', '$injector',
		function($scope, $injector) {
			require(['controllers/artist-ctrl'], function(artistController) {
				$injector.invoke(artistController, this, {
					'$scope': $scope
				});
			});
		}
	]);

});
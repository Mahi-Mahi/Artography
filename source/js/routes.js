/**
 * Defines the main routes in the application.
 * The routes you see here will be anchors '#/' unless specifically configured otherwise.
 */

define(['./app', './config'], function(app) {
	'use strict';

	app.config(['$locationProvider',
		function($locationProvider) {
			$locationProvider.html5Mode(true);
			$locationProvider.hashPrefix('!');
		}
	]);

	app.config(['$routeProvider',
		function($routeProvider) {
			$routeProvider.when('/', {
				templateUrl: '/js/modules/home/home.html',
				controller: 'HomeController'
			});

			$routeProvider.when('/artistes', {
				templateUrl: '/js/modules/artists/artists.html',
				controller: 'ArtistsController'
			});

			$routeProvider.otherwise({
				redirectTo: '/'
			});

			//$locationProvider.html5Mode(true);
		}
	]);
});
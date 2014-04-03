define(['angular', 'app'], function(angular, app) {
	'use strict';

	console.log("routes.js");

	app.config(['$locationProvider',
		function($locationProvider) {
			$locationProvider.html5Mode(true);
			$locationProvider.hashPrefix('!');
		}
	]);

	return app.config(['$routeProvider',
		function($routeProvider) {
			console.log("routes");
			$routeProvider.when('/', {
				templateUrl: '/partials/home.html',
				controller: 'homeController'
			});

			$routeProvider.when('/artistes', {
				templateUrl: '/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init();
					}
				}
			});

			$routeProvider.when('/artistes/:period', {
				templateUrl: '/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init();
					}
				}
			});

			$routeProvider.when('/artistes/:period/:genre', {
				templateUrl: '/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init();
					}
				}
			});

			$routeProvider.when('/artistes/:period/:genre/:age', {
				templateUrl: '/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init();
					}
				}
			});

			$routeProvider.when('/artiste/:id', {
				templateUrl: '/partials/artist.html',
				controller: 'artistController',
				resolve: {
					datasets: ['$route', 'dataService',
						function($route, dataService) {
							return dataService.getArtist($route.current.params.id);
						}
					]
				}
			});

			$routeProvider.when('/artiste/:id/:period', {
				templateUrl: '/partials/artist.html',
				controller: 'artistController',
				resolve: {
					datasets: ['$route', 'dataService',
						function($route, dataService) {
							return dataService.getArtist($route.current.params.id);
						}
					]
				}
			});

			$routeProvider.otherwise({
				redirectTo: '/'
			});

		}
	]);

});
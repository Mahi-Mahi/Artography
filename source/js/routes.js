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
				templateUrl: '/arts-visuels/partials/home.html',
				controller: 'homeController'
			});

			$routeProvider.when('/test/', {
				templateUrl: '/arts-visuels/partials/artist.html',
				controller: 'artistController'
			});

			// ARTISTES

			$routeProvider.when('/artistes', {
				templateUrl: '/arts-visuels/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('artist');
					}
				}
			});

			$routeProvider.when('/artistes/:period', {
				templateUrl: '/arts-visuels/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('artist');
					}
				}
			});

			$routeProvider.when('/artistes/:period/:genre', {
				templateUrl: '/arts-visuels/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('artist');
					}
				}
			});

			$routeProvider.when('/artistes/:period/:genre/:age', {
				templateUrl: '/arts-visuels/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('artist');
					}
				}
			});

			// ARTIST

			$routeProvider.when('/artiste/:id', {
				templateUrl: '/arts-visuels/partials/artist.html',
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
				templateUrl: '/arts-visuels/partials/artist.html',
				controller: 'artistController',
				resolve: {
					datasets: ['$route', 'dataService',
						function($route, dataService) {
							return dataService.getArtist($route.current.params.id);
						}
					]
				}
			});

			// GALLERIES

			$routeProvider.when('/galeries', {
				templateUrl: '/arts-visuels/partials/galleries.html',
				controller: 'galleriesController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('gallery');
					}
				}
			});

			$routeProvider.when('/galeries/:period', {
				templateUrl: '/arts-visuels/partials/galleries.html',
				controller: 'galleriesController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('gallery');
					}
				}
			});

			// GALLERY

			$routeProvider.when('/galerie/:id', {
				templateUrl: '/arts-visuels/partials/gallery.html',
				controller: 'galleryController',
				resolve: {
					datasets: ['$route', 'dataService',
						function($route, dataService) {
							return dataService.getGallery($route.current.params.id);
						}
					]
				}
			});

			$routeProvider.when('/galerie/:id/:period', {
				templateUrl: '/arts-visuels/partials/gallery.html',
				controller: 'galleryController',
				resolve: {
					datasets: ['$route', 'dataService',
						function($route, dataService) {
							return dataService.getGallery($route.current.params.id);
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
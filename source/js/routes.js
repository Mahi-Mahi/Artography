define(['angular', 'app'], function(angular, app) {
	'use strict';

	console.log("routes.js");

	app.config(['$locationProvider',
		function($locationProvider) {
			$locationProvider.html5Mode(true);
			$locationProvider.hashPrefix('!');
		}
	]);

	/*
	app.run(function(gettextCatalog) {
		gettextCatalog.currentLanguage = 'fr';
		gettextCatalog.debug = true;
	});
	*/

	return app.config(['$routeProvider',
		function($routeProvider) {
			console.log("routes");
			$routeProvider.when('/', {
				templateUrl: '/partials/home.html',
				controller: 'homeController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('today');
					}
				}
			});

			// ARTISTES

			$routeProvider.when('/artistes', {
				templateUrl: '/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('artist');
					}
				}
			});

			$routeProvider.when('/artistes/:period', {
				templateUrl: '/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('artist');
					}
				}
			});

			$routeProvider.when('/artistes/:period/:genre', {
				templateUrl: '/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('artist');
					}
				}
			});

			$routeProvider.when('/artistes/:period/:genre/:age', {
				templateUrl: '/partials/artists.html',
				controller: 'artistsController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('artist');
					}
				}
			});

			// ARTIST

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

			// GALLERIES

			$routeProvider.when('/galeries', {
				templateUrl: '/partials/galleries.html',
				controller: 'galleriesController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('gallery');
					}
				}
			});

			$routeProvider.when('/galeries/:period', {
				templateUrl: '/partials/galleries.html',
				controller: 'galleriesController',
				resolve: {
					datasets: function(dataService) {
						return dataService.init('gallery');
					}
				}
			});

			// GALLERY

			$routeProvider.when('/galerie/:id', {
				templateUrl: '/partials/gallery.html',
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
				templateUrl: '/partials/gallery.html',
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
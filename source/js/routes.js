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
                templateUrl: '/js/modules/artists/artists.html',
                controller: 'ArtistsController',
                resolve: {
                    datasets: function(dataService) {
                        return dataService.init();
                    }
                }
            });

            $routeProvider.when('/artiste/:artistId', {
                templateUrl: '/js/modules/artist/artist.html',
                controller: 'ArtistController',
                resolve: {
                    datasets: function(dataService) {
                        return dataService.init();
                    }
                }
            });

            $routeProvider.when('/artiste', {
                templateUrl: '/js/modules/artist/artist.html',
                controller: 'ArtistController',
                resolve: {
                    datasets: function(dataService) {
                        return dataService.init();
                    }
                }
            });

            $routeProvider.otherwise({
                redirectTo: '/'
            });

        }
    ]);

});

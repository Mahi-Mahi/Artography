define(['./module'], function(app) {
    'use strict';

    app.factory('dataService', function($rootScope, $http, localStorageService) {

        var dataService = {};

        dataService.data = {};

        // TODO autoupdate on gulp.bump-version ( == git.revision )
        // so from a config.json
        dataService.version = 10;

        /*
		http://gregpike.net/demos/angular-local-storage/demo/demo.html
		*/

        dataService.clear = function() {
            localStorageService.clearAll();
        }

        dataService.init = function() {
            if (localStorageService.get('version') != dataService.version) {
                dataService.clear();
                localStorageService.add('version', dataService.version);
            }
            dataService.get('expos', 'today');
            // return $http.get('/data/expos/today.json')
            // 	.success(function(data) {
            // 		// dataService.data.expos = data;
            // 	});
        }

        dataService.fetch = function(type, idx) {
            console.log("fetch(" + type + ',' + idx);
            var url;
            if (idx) {
                url = '/data/' + type + '/' + idx + '.json';
            } else {
                url = '/data/' + type + '.json';
            }

            // $http returns a promise, which has a then function, which also returns a promise
            var promise = $http.get(url).then(function(response) {
                return response.data;
            });
            return promise;
        }

        dataService.get = function(type, idx) {
            // get from app cache
            var data = null;

            if (!dataService.data[type])
                dataService.data[type] = {};
            data = dataService.data[type][idx];

            if (!data) {
                // get from localStorage
                var localStorageKey = type + '-' + idx;
                var data = localStorageService.get(localStorageKey);

                console.log("localStorageService.get(" + localStorageKey)

                if (!data) {

                    // get from http
                    dataService.fetch(type, idx).then(function(d) {

                        // store in localStorage
                        localStorageService.add(localStorageKey, d);

                        // store in app cache
                        dataService.data[type][idx] = d;

                        return d;

                    });

                }

                // store in app cache
                dataService.data[type][idx] = data;

            }

            return data;

        }

        //Gets the list of nuclear weapons
        dataService.getExpos = function(idx) {
            if (!idx)
                idx = 'today';
            return dataService.get('expos', idx);
        };

        dataService.getCountries = function() {
            return dataService.get('countries');
        };

        dataService.getYears = function() {
            return dataService.get('years');
        };

        return dataService;

    });
});
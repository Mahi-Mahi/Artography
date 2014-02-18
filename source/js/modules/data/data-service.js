define(['./module'], function(app) {
	'use strict';

	app.factory('dataService', function($rootScope, $http, $q, localStorageService) {

		var dataService = {};

		dataService.data = {};

		// TODO autoupdate on gulp.bump-version ( == git.revision )
		// so from a config.json
		dataService.version = Date.now();

		/*
		http://gregpike.net/demos/angular-local-storage/demo/demo.html
		*/

		dataService.clear = function() {
			console.log("dataService.clear");
			localStorageService.clearAll();
		}

		dataService.init = function() {

			// dataService.clear();

			if (localStorageService.get('version') != dataService.version) {
				dataService.clear();
				localStorageService.add('version', dataService.version);
			}

			return dataService.getYears().then(function() {
				return dataService.getCountries();
			});

		}

		dataService.get = function(type, idx) {

			var deferred = $q.defer();

			// get from app cache
			var data;

			if (!dataService.data[type])
				dataService.data[type] = {};
			data = dataService.data[type][idx];

			if (!data) {
				// get from localStorage
				var localStorageKey = type + '-' + idx;
				var data = localStorageService.get(localStorageKey);

				console.log("localStorageService.get(" + localStorageKey)

				if (!data) {

					var url = '/data/' + type + (idx ? '/' + idx : '') + '.json';

					// get from http
					console.log("fetch " + url);
					var res = $http.get(url).success(function(response) {

						setTimeout(function() {
							// store in localStorage
							localStorageService.add(localStorageKey, response.data);

							// store in app cache
							dataService.data[type][idx] = response.data;

							deferred.resolve(response.data);

						}, 1000);

					});

					return res;

				}

				// store in app cache
				dataService.data[type][idx] = data;

			}
			deferred.resolve(data);

			return deferred.promise;
		}

		//Gets the list of nuclear weapons
		dataService.getExpos = function(idx) {
			if (!idx)
				idx = 'today';
			return dataService.get('expos', idx).then(function(response) {
				dataService.data.expos[idx] = response.data;
			});
		};

		dataService.getCountries = function() {
			return dataService.get('countries').then(function(response) {
				dataService.data.countries = response.data;
			});
		};

		dataService.getYears = function() {
			return dataService.get('years').then(function(response) {
				dataService.data.years = response.data;
			});
		};

		return dataService;

	});
});
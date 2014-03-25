define(['./module'], function(app) {
	'use strict';

	app.factory('dataService', function($rootScope, $http, $q, localStorageService) {

		var dataService = {};

		dataService.data = {};

		// TODO autoupdate on gulp.bump-version ( == git.revision )
		// eq. from a config.json
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
				return dataService.getCountries().then(function() {
					return dataService.getArtist('names');
				});
			});

		}

		dataService.get = function(type, idx) {
			var deferred = $q.defer();

			// get from app cache
			var data;
			var data_key = type + '-' + idx;

			if (idx) {
				if (!dataService.data[type]) {
					dataService.data[type] = {};
				}
				data = dataService.data[type][idx];
			} else {
				data = dataService.data[type];
			}

			if (data === undefined) {
				// get from localStorage
				var data = localStorageService.get(data_key);

				if (!data) {

					var url = '/data/' + type + (idx ? '/' + idx : '') + '.json';

					// get from http
					var res = $http({
						method: 'GET',
						url: url
					}).success(function(data) {

						// store in localStorage
						localStorageService.add(data_key, data);

						if (idx) {
							dataService.data[type][idx] = data;
						} else {
							dataService.data[type] = data;
						}

						deferred.resolve(data);

					}).error(function() {
						console.log("http error");
					});

					return res;

				}

				// store in app cache
				if (idx) {
					dataService.data[type][idx] = data;
				} else {
					dataService.data[type] = data;
				}
			}

			deferred.resolve(data);

			return deferred.promise;
		}

		dataService.getExpos = function(idx) {
			if (!idx)
				idx = 'today';
			return dataService.get('expos', idx);
		};

		dataService.getArtist = function(id) {
			return dataService.get('artists', id);
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

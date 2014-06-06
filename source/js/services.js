/* global define */
"use strict";

define(['angular'], function(angular) {

	/* Services */

	angular.module('myApp.services', ['ngResource', 'LocalStorageModule'])

	.factory('formatService', function($rootScope) {

		var formatService = {};

		formatService.formatDate = function(d) {
			d = new Date(Date.parse(d));
			d = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
			return d;
		};

		formatService.formatLongDate = function(d) {
			d = new Date(Date.parse(d));
			d = d.getDate() + ' ' + formatService.locale.fr.month_names[d.getMonth()] + ' ' + d.getFullYear();
			return d;
		};

		formatService.locale = {
			fr: {
				month_names: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
				month_names_short: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec']
			},
			en: {
				month_names: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
				month_names_short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			}
		};

		return formatService;
	})

	.factory('langService', function($rootScope) {

		var langService = {};

		langService.init = function() {
			if (!jQuery.cookie('lang')) {
				this.setLang('fr');
			} else {
				this.setLang(jQuery.cookie('lang'));
			}
		};

		langService.setLang = function(lang) {
			jQuery.cookie('lang', lang);
			$rootScope.lang = lang;
			jQuery('body').removeClass('lang-fr').removeClass('lang-en');
			jQuery('body').addClass('lang-' + $rootScope.lang);
		};

		return langService;
	})

	.factory('dataService', function($rootScope, $http, $q, localStorageService) {

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
		};

		dataService.init = function(type) {

			console.log("dataService.init");
			// dataService.clear();

			console.log(localStorageService.get('version'));
			if (!localStorageService.get('version')) {
				localStorageService.add('version', dataService.version);
			}
			if (localStorageService.get('version') != dataService.version) {
				dataService.clear();
				localStorageService.add('version', dataService.version);
			}

			// return dataService.getYears().then(function() {
			// return dataService.getCountries().then(function() {
			switch (type) {
				case 'today':
					return dataService.getToday();
					break;
				case 'gallery':
					return dataService.getGallery('names');
					break;
				case 'artist':
					return dataService.getArtist('names');
					break;
			}
			// });
			// });

		};

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
				data = localStorageService.get(data_key);

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
		};

		dataService.getFairs = function(idx) {
			if (!idx)
				idx = '2014';
			return dataService.get('fairs', idx);
		};

		dataService.getGallery = function(id) {
			console.log("getGallery(" + id);
			return dataService.getYears().then(function() {
				return dataService.getCountries().then(function() {
					return dataService.get('galleries', id);
				});
			});
		};

		dataService.getExpos = function(idx) {
			if (!idx)
				idx = 'today';
			return dataService.get('expos', idx);
		};

		dataService.getArtist = function(id) {
			console.log("getArtist(" + id);
			return dataService.getYears().then(function() {
				return dataService.getCountries().then(function() {
					return dataService.get('artists', id);
				});
			});
		};

		dataService.getCountries = function() {
			return dataService.get('countries');
		};

		dataService.getYears = function() {
			return dataService.get('years');
		};

		dataService.getToday = function() {
			return dataService.get('today');
		};

		return dataService;

	});

	/*

	angular.module('dataService', ['ngResource'])

		.factory('dataService',['$scope', '$injector',
			function($scope, $injector) {
				require(['controllers/data-service'], function(dataService) {
					$injector.invoke(dataService, this, {
						'$scope': $scope
					});
				});
			}
		]);
*/
});
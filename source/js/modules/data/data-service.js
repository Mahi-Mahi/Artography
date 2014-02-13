define(['./module'], function(app) {
	'use strict';

	app.factory('dataService', function($rootScope, $http) {

		var dataService = {};

		dataService.data = {};

		dataService.init = function() {
			return $http.get('/data/expos.json')
				.success(function(data) {
					dataService.data.expos = data;
				});
		}

		//Gets the list of nuclear weapons
		dataService.getExpos = function() {

			return dataService.data.expos;
		};

		return dataService;

	});
});
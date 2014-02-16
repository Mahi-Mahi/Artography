define(['./module'], function(app) {
	'use strict';

	app.factory('dataService', function($rootScope, $http, localStorageService) {

		var dataService = {};

		dataService.data = {};

		/*
		http://gregpike.net/demos/angular-local-storage/demo/demo.html
		localStorageService.add('localStorageKey','Add this!');
		var data = localStorageService.get('localStorageKey');
		*/

		dataService.init = function() {
			// localStorageService.clearAll();
			dataService.get('expos', 'today');
			// return $http.get('/data/expos/today.json')
			// 	.success(function(data) {
			// 		// dataService.data.expos = data;
			// 	});
		}

		dataService.fetch = function(type, idx) {
			console.log("fetch("+type+','+idx);
			
	    	// $http returns a promise, which has a then function, which also returns a promise
    		var promise = $http.get('/data/'+type+'/'+idx+'.json').then(function (response) {
        		return response.data;
      		});
      		return promise;
		}

		dataService.get = function(type, idx){
			// get from app cache
			var data = null;

			if ( ! dataService.data[type] )
				dataService.data[type] = {};
			data = dataService.data[type][idx];

			if ( ! data ) {
				// get from localStorage
				var localStorageKey = type + '-' + idx;
				var data = localStorageService.get(localStorageKey);

				console.log("localStorageService.get("+localStorageKey)

				if ( ! data ) {

					// get from http
					dataService.fetch(type, idx).then(function(d){
		
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
			if ( ! idx )
				idx = 'today';
			return dataService.get('expos', idx);
		};

		return dataService;

	});
});
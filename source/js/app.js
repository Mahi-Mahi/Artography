define([
	'angular',
	'filters',
	'services',
	'directives',
	'controllers',
	'angularRoute',
	'angularResource',
    'angularLocalStorage',
	'angularSanitize'
	// 'angularAnimate',
], function(angular, filters, services, directives, controllers) {
	'use strict';

	// Declare app level module which depends on filters, and services

    console.log("app.js");

	return angular.module('myApp', [
		'ngRoute',
		'ngResource',
		'ngSanitize',
		// 'ngAnimate',
		'myApp.controllers',
		'myApp.filters',
		'myApp.services',
		'myApp.directives',
		'dataService'
	]);
});



/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
 /*
define([
	'angular',
	'./config',
	'./modules/data/index',
	'./modules/home/index',
	'./modules/artists/index',
	'./modules/artist/index'
], function(ng) {
	'use strict';

	return ng.module('app', [
		'ngRoute',
		'LocalStorageModule',
		'app.constants',
		'app.dataService',
		'app.home',
		'app.artists',
		'app.artist'
	]);
});
*/

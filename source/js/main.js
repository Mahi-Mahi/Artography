/* global require */
/* global angular */

require.config({
	urlArgs: "bust=" + 'CACHE_BUST',
	paths: {
		angular: '/vendor/angular/angular',
		angularRoute: '/vendor/angular-route/angular-route',
		angularSanitize: '/vendor/angular-sanitize/angular-sanitize',
		angularResource: '/vendor/angular-resource/angular-resource',
		angularLocalStorage: '/vendor/angular-local-storage/angular-local-storage',
		raphael: '/vendor/raphael/raphael',
		jquery: '/vendor/jquery/dist/jquery',
		// angularAnimate: '/vendor/angular-animate/angular-animate',
		// angularMocks: '/vendor/angular-mocks/angular-mocks',
		text: '/vendor/requirejs-text/text',
		'jquery-smartresize': '/vendor/jquery-smartresize/jquery.debouncedresize'
	},
	shim: {
		'angular': {
			'exports': 'angular'
		},
		'angularRoute': ['angular'],
		'angularSanitize': ['angular'],
		'angularResource': ['angular'],
		'angularLocalStorage': ['angular'],
		// 'angularAnimate': ['angular'],
		'angularMocks': {
			deps: ['angular'],
			'exports': 'angular.mock'
		},
		'jquery-smartresize': {
			deps: ['jquery']
		}
	},
	priority: [
		"angular"
	]
});

//http://code.angularjs.org/1.2.1/docs/guide/bootstrap#overview_deferred-bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

require([
	'angular',
	'app',
	'routes'
], function(angular, app, routes) {
	'use strict';
	var $html = angular.element(document.getElementsByTagName('html')[0]);

	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});
/* global require */
/* global angular */

require.config({
	urlArgs: "bust=" + Math.random(), //'CACHE_BUST',
	paths: {
		angular: '/arts-visuels/vendor/angular/angular',
		angularRoute: '/arts-visuels/vendor/angular-route/angular-route',
		angularSanitize: '/arts-visuels/vendor/angular-sanitize/angular-sanitize',
		angularResource: '/arts-visuels/vendor/angular-resource/angular-resource',
		angularLocalStorage: '/arts-visuels/vendor/angular-local-storage/angular-local-storage',
		// ngProgress: '/arts-visuels/vendor/ngprogress/build/ngProgress',
		raphael: '/arts-visuels/vendor/raphael/raphael',
		jquery: '/arts-visuels/vendor/jquery/dist/jquery',
		// angularAnimate: '/vendor/angular-animate/angular-animate',
		// angularMocks: '/vendor/angular-mocks/angular-mocks',
		text: '/arts-visuels/vendor/requirejs-text/text',
		'jquery-smartresize': '/arts-visuels/vendor/jquery-smartresize/jquery.debouncedresize'
	},
	shim: {
		'angular': {
			'exports': 'angular'
		},
		'angularRoute': ['angular'],
		'angularSanitize': ['angular'],
		'angularResource': ['angular'],
		'angularLocalStorage': ['angular'],
		// 'ngProgress': ['angular'],
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
	// var $html = angular.element(document.getElementsByTagName('html')[0]);

	Array.prototype.diff = function(a) {
		return this.filter(function(i) {
			return a.indexOf(i) < 0;
		});
	};

	angular.element().ready(function() {
		angular.resumeBootstrap([app['name']]);
	});
});
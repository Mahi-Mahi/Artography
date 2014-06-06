/* global require */
/* global angular */

require.config({
	urlArgs: "bust=" + Math.random(), //'CACHE_BUST',
	paths: {
		angular: '/vendor/angular/angular',
		angularRoute: '/vendor/angular-route/angular-route',
		angularSanitize: '/vendor/angular-sanitize/angular-sanitize',
		angularResource: '/vendor/angular-resource/angular-resource',
		angularLocalStorage: '/vendor/angular-local-storage/angular-local-storage',
		// angularGettext: '/vendor/angular-gettext/dist/angular-gettext',
		// ngProgress: '/vendor/ngprogress/build/ngProgress',
		raphael: '/vendor/raphael/raphael',
		jquery: '/vendor/jquery/dist/jquery',
		'jquery-colorbox': '/vendor/jquery-colorbox/jquery.colorbox',
		// angularAnimate: '/vendor/angular-animate/angular-animate',
		// angularMocks: '/vendor/angular-mocks/angular-mocks',
		text: '/vendor/requirejs-text/text',
		'jquery-smartresize': '/vendor/jquery-smartresize/jquery.debouncedresize',
		'jquery-cookie': '/vendor/jquery-cookie/jquery.cookie',
		translations: '/js/translations'
	},
	shim: {
		'angular': {
			'exports': 'angular'
		},
		'angularRoute': ['angular'],
		'angularSanitize': ['angular'],
		'angularResource': ['angular'],
		'angularLocalStorage': ['angular'],
		// 'angularGettext': ['angular'],
		// 'ngProgress': ['angular'],
		// 'angularAnimate': ['angular'],
		'angularMocks': {
			deps: ['angular'],
			'exports': 'angular.mock'
		},
		'jquery-smartresize': {
			deps: ['jquery']
		},
		'jquery-colorbox': {
			deps: ['jquery']
		},
		'jquery-cookie': {
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
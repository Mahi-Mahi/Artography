/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
define([
	'angular',
	'./config',
	'./modules/data/index',
	'./modules/home/index',
	'./modules/artists/index'
], function(ng) {
	'use strict';

	return ng.module('app', [
		'ngRoute',
		'app.constants',
		'app.dataService',
		'app.home',
		'app.artists'
	]);
});
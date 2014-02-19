/**
 * loads sub modules and wraps them up into the main module
 * this should be used for top-level module definitions only
 */
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
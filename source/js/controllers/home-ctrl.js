/* global define */
"use strict";

define([], function() {
	return ['$scope', '$rootScope', '$location', '$route', 'dataService',
		function($scope, $rootScope, $location, $route, dataService) {

			jQuery('body').addClass('home');

			dataService.init('artist');

			/*
			var raphael = new Raphael(document.getElementById('canvas'), 600, 600);

			raphael.circle(200, 200, 50).attr({
				fill: 'url(/arts-visuels/assets/images/stripe-Institution-publique.png)'
			});
*/

		}];
});
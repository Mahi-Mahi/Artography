/**
 * Home controller definition
 * @scope Controllers
 */
define(['./module'], function(app) {
    "use strict";

    app.controller('ArtistsController', ['$scope', 'dataService',
        function($scope, dataService) {

            var expos = dataService.getExpos();
            var countries = dataService.getCountries();

            var data = {};

            angular.forEach(expos, function(expo) {
                if (!data[expo.country])
                    data[expo.country] = [];
                if (data[expo.country].indexOf(expo.id) == -1) {
                    data[expo.country].push(expo.id);
                }
            });

            var max_artists = 0;
            angular.forEach(data, function(artists) {
                max_artists = Math.max(max_artists, artists.length);
            });

            console.log("max_artists : " + max_artists);

            var canvasW = 600,
                canvasH = 600;

            var divW = 600,
                divH = 600;

            var chart = Raphael(document.getElementById('canvas'), canvasW, canvasH);

            var offsetX = 0,
                offsetY = 0;

            var a = 2 * Math.PI / Object.keys(data).length;

            var originX = offsetX + divW / 2;
            var originY = offsetY + divH / 2;

            var central_radius = divW / 4 - 90;

            chart.circle(originX, originY, central_radius - 5).attr({
                'stroke': '#333',
                'stroke-width': 1
            });

            var startA = 0;
            var endA = 0;

            var slice;

            var i = 0;

            angular.forEach(data, function(artists, country) {

                //start and end points of the topic region
                if (i > 0) {
                    startA = endA;
                }
                endA = startA + a;

                console.log(country + " : " + artists.length);

                var radius = central_radius;
                var layerW = divW / 3 / max_artists;

                console.log(layerW);

                angular.forEach(artists, function(artist) {

                    var blX = originX + Math.sin(endA) * radius;
                    var blY = originY + Math.cos(endA) * radius;
                    var brX = originX + Math.sin(startA) * radius;
                    var brY = originY + Math.cos(startA) * radius;
                    var tplX = originX + Math.sin(endA) * (radius + layerW);
                    var tplY = originY + Math.cos(endA) * (radius + layerW);
                    var tprX = originX + Math.sin(startA) * (radius + layerW);
                    var tprY = originY + Math.cos(startA) * (radius + layerW);

                    // var strokeW = (fullRadius / orderKey.length) / 2
                    // var startRadius = divW / 4 - .5 * strokeW - 40;
                    // var strokeRadius = startRadius + strokeW + (strokeW + 2) * l

                    var path = [
                        ["M", blX, blY],
                        ["A", radius, radius, 0, 0, 1, brX, brY],
                        ["L", tprX, tprY],
                        ["A", radius + layerW, radius + layerW, 0, 0, 0, tplX, tplY],
                        ["L", blX, blY],
                        ['z']
                    ];
                    radius += layerW;

                    // console.log(path);

                    slice = chart.path(path).attr({

                        fill: '#FF0000',
                        "stroke-width": 1,
                        "stroke": "#fff"
                    });

                    slice.node.setAttribute('class', 'country-' + country + ' artist artist-' + artist);


                });

                i++;

            });

        }

    ]);
});
'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
		nggettext_extract: {
			pot: {
				files: {
					'source/po/template.pot': ['source/partials/*.html']
				}
			},
		},

		nggettext_compile: {
			all: {
				files: {
					'source/js/translations.js': ['source/po/*.po']
				}
			},
		},
	});

	grunt.loadNpmTasks('grunt-angular-gettext');

	grunt.registerTask('default', ['nggettext_extract', 'nggettext_compile']);
};
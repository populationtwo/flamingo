module.exports = function (grunt) {
	'use strict';

	// Load all grunt tasks
	require( 'matchdep' ).filterDev( 'grunt-*' ).forEach( grunt.loadNpmTasks );

	// Project configuration
	grunt.initConfig( {
		pkg: grunt.file.readJSON( 'package.json' ),

		jshint: {
			all: ['assets/js/src/*.js']
		},

		uglify: {
			build: {
				src : 'app/scripts/script.js',
				dest: 'app/scripts/script.min.js'
			}
		},

		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'compressed',
					loadPath: [
						'bower_components/bourbon/app/assets/stylesheets/',
						'bower_components/neat/app/assets/stylesheets/'
					]
				},
				files  : [{
					expand: true,
					cwd   : 'app/sass/',
					src   : ['*.scss'],
					dest  : 'app/styles/',
					ext   : '.css'
				}]
			}
		},

		watch: {
			css    : {
				files  : ['app/sass/**/*.scss', 'app/sass/*.scss'],
				tasks  : ['sass'],
				options: {
					debounceDelay: 500
				}
			},
			scripts: {
				files  : ['assets/js/src/*.js'],
				tasks  : ['uglify', 'jshint'],
				options: {
					spawn: false
				}
			}
		}
	} );

	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-scss-lint' );

	// Default task.
	grunt.registerTask( 'default', ['uglify', 'jshint'] );

	grunt.util.linefeed = '\n';
};
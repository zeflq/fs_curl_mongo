'use strict';

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'app/**/*.js'],
		mochaTests: ['app/tests/**/*.js'],
		mochaInit: ['app/init/**/*.js']
	};

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		jshint: {
			all: {
				src: watchFiles.serverJS,
				options: {
					jshintrc: true
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					ext: 'js,html',
					watch: watchFiles.serverJS
				}
			}
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		},
		mochaTest: {
			test: {
				src: watchFiles.mochaTests,
				options: {
					reporter: 'spec',
					require: 'server.js'
				}
			},
			init: {
				src: watchFiles.mochaInit,
				options: {
					reporter: 'spec',
					require: 'server.js'
				}
			}
		}
	});

	// Load NPM tasks 
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);
	grunt.registerTask('default', ['concurrent:default']);
	grunt.registerTask('test', ['mochaTest']);
	grunt.registerTask('init', ['mochaTest:init']);
};
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      styles: {
        files: ['scss/{,*/}*.scss'],
        tasks: ['compass:dev']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'views/{,*/}*.jade',
          'public/css/{,*/}*.css',
          'public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'public/js/{,*/}*.js'
        ]
      }
    },

    express: {
        dev: {
            options: {
                script: 'app.js',
                args: ['dev']
            }
        },

        prod: {
            options: {
                script: 'app.js',
                args: ['production']
            }
        }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'scss',
          specify: ['scss/main.scss', 'scss/ie.scss', 'scss/home.scss'],
          cssDir: 'public/css'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-compass');


  grunt.registerTask('serve', function(target){

    var expressTask = 'express:dev';

    if (target === 'production'){
        expressTask = 'express:prod'
    }

    grunt.task.run([
        'compass:dev',
        expressTask,
        'watch'
    ])
  });

};

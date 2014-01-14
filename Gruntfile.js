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
      livereload: {
        options: {
          livereload: true
        },
        files: [
          'views/{,*/}*.jade',
          'public/css/{,*/}*.css',
          //'public/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
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
        }
    },

    compass: {
      dev: {
        options: {
          sassDir: 'scss',
          specify: ['scss/main.scss'],
          cssDir: 'public/css'
        }
      }
    },

    // these are for build only
    jade: {
      production: {
        files: {
          'build/index.html': ['views/index.jade'],
          'build/project.html': ['views/project.jade']
        },
        options: {
          pretty: true
        }
      }
    },
    
    clean: {
      production: ['build']
    },

    copy: {
      production: {
        files: [
          {
            expand: true,
            cwd: 'public/',
            src: ['images/**', 'fonts/**', 'flash/**', 'js/**', 'css/**', 'video/**'],
            dest: 'build/'
          }
        ]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');



  grunt.registerTask('serve', function(){

    grunt.task.run([
      'compass:dev',
      'express:dev',
      'watch'
    ])
  });


  grunt.registerTask('build', function(){
    grunt.task.run([
      'clean:production',
      'compass',
      'copy:production',
      'jade:production'
    ])
  });

};

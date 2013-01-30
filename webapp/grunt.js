module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-compass');
  grunt.loadNpmTasks('grunt-hogan');

  // Project configuration.
  grunt.initConfig({

    requirejs: {
      dev: {
        options: {
          appDir: "app/",
          baseUrl: "public/js",
          dir: "app-dev-build",
          optimizeCss: "none",
          optimize: "none",
          paths: {
              "jquery": "lib/jquery",
              "hogan": "lib/hogan",
              "templates": "templates",
              "underscore": "lib/underscore",
              "json2": "lib/json2",
              "backbone": "lib/backbone"
          },
          shim: {
            'backbone': {
                deps: ['underscore', 'jquery','json2'],
                exports: 'Backbone'
            },
            'templates': {
                deps: ['hogan'],
                exports: 'templates'
            }
          },
          name: "app"
        }
      },
      prod: {
        options: {
          appDir: "app/",
          baseUrl: "public/js/",
          dir: "app-prod-build",
          optimizeCss: "none",
          optimize: "uglify",
          uglify: {
              no_mangle: false
          },
          paths: {
              "jquery": "lib/jquery",
              "hogan": "lib/hogan",
              "templates": "templates",
              "underscore": "lib/underscore",
              "json2": "lib/json2",
              "backbone": "lib/backbone"
          },
          shim: {
            'backbone': {
                deps: ['underscore', 'jquery','json2'],
                exports: 'Backbone'
            },
            'templates': {
                deps: ['hogan'],
                exports: 'templates'
            }
          },
          name: "app"
        }
      }
    },

    compass: {
      dev: {
        src: "app-dev-build/public/scss",
        dest: "app-dev-build/public/css",
        linecomments: true,
        outputstyle: 'nested'
      },
      prod: {
        src: "app-prod-build/public/scss",
        dest: "app-prod-build/public/css",
        linecomments: false,
        outputstyle: 'compressed'
      }
    },

    hogan: {
      default: {
        compile: {
          templates: "app/views/partials/*.hjs",
          output: "app/public/js/templates.js",
          binderName: 'hulk'
        }
      }
    },

    watch: {
      dev: {
        files: ["app/views/partials/*.hjs", "app/public/js/*","app/public/scss/*"],
        tasks: 'dev'
      },
      prod: {
        files: ["app/views/partials/*.hjs", "app/public/js/*","app/public/scss/*"],
        tasks: 'prod'
      },
      default: {
        files: ["app/views/partials/*.hjs", "app/public/js/*","app/public/scss/*"],
        tasks: 'default'
      }
    }

  });

  grunt.registerTask('dev', ['hogan', 'requirejs:dev', 'compass-clean', 'compass:dev']);
  grunt.registerTask('prod', ['hogan', 'requirejs:prod', 'compass-clean', 'compass:prod']);
  grunt.registerTask('default', ['hogan', 'requirejs', 'compass-clean', 'compass']);

}
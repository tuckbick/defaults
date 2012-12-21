/* Tucker Bickler - 2012 */


/**************/
/*   CONFIG   */
/**************/

var config = {

  js: {
    input: [

      // Library files
      'js/src/lib/jquery.min.js',
      'js/src/lib/jquery.dropkick.min.js',
      'js/src/lib/jquery.scrollTo.min.js',

      // Development files
      'js/src/util.js',
      'js/src/header.js',
      'js/src/form.js',
      'js/src/global.js'

    ],
    output_cat: 'js/app.js',
    output_min: 'js/app.min.js'
  },

  css: {
    input: [
      'css/dropkick.css',
      'css/global.css'
    ],
    output: 'css/style.css'
  }

};




module.exports = function(grunt) {



  /***************/
  /*   PLUGINS   */
  /***************/

  config.css.compress = { files: {} };
  config.css.compress.files[config.css.output] = config.css.input;

  grunt.loadNpmTasks('grunt-contrib-mincss');
  // grunt.loadNpmTasks('grunt-smushit');
  grunt.loadNpmTasks('grunt-img');



  // Project configuration.
  grunt.initConfig({



    /**************/
    /* JAVASCRIPT */
    /**************/

    // List of files to be concatenated, used by the "concat" task.
    concat: {
      dist: {
        src: config.js.input,
        dest: config.js.output_cat
      }
    },

    // List of files to be minified with UglifyJS, used by the "min" task.
    min: {
      dist: {
        src: config.js.output_cat,
        dest: config.js.output_min
      }
    },



    /***************/
    /*     CSS     */
    /***************/

    // List of files to be concatenated and minified, used by the "cssmin" task.
    mincss: {
      compress: config.css.compress
    },



    /***************/
    /*    WATCH    */
    /***************/

    watch: {
      js: {
        files: config.js.input,
        tasks: 'default_js'
      },
      css: {
        files: config.css.input,
        tasks: 'default_css'
      }
    }
  });
  
  grunt.registerTask('default_js', 'concat min');
  grunt.registerTask('default_css', 'mincss');



  /***************/
  /*   DEFAULT   */
  /***************/

  grunt.registerTask('default', ['default_js', 'default_css']);

}
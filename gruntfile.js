module.exports = function(grunt) {
  grunt.initConfig ({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['gruntfile.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    less: {
      dist: {
        expand: true,                   // Enable dynamic expansion.
        cwd: 'app/less',                // Src matches are relative to this path.
        src: ['*.less','!_*.less'],     // Actual pattern(s) to match.
        dest: 'public/css',             // Destination path prefix.
        ext: '.css',                    // Dest filepaths will have this extension.
        options: {
          sourcemap: 'none',          // No need for these now
          cacheLocation: 'temp/.less-cache'
        }
      }
    },
    traceur: {
      build: {
        cwd: 'app/es6',
        src: '**/*.es6.js',
        dest: 'public/js',
        rename  : function (dest, src) {
          var folder    = src.substring(0, src.lastIndexOf('/'));
          var filename  = src.substring(src.lastIndexOf('/'), src.length);

          filename  = filename.split('.es6.js')[0];

          return dest + '/' + folder + filename + '.js';
        },
        expand: true
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>', '<%= traceur.build.cwd %>/<%= traceur.build.src %>'],
        tasks: ['jshint', 'traceur']
      },
      less: {
        files: ['app/less/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      },
      pug: {
        files: ['app/views/**/*.pug'],
        options: {
          data: {
            debug: true,
            timestamp: "<%= grunt.template.today() %>"
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('setup', ['less','jshint','traceur']);
  grunt.registerTask('default', ['setup','watch']);

  grunt.registerMultiTask('traceur', 'ES6 to ES5', function(){
    var exec  = require('child_process').exec;
    var cmd;

    this.files.forEach(function(f){
      cmd = './tools/traceur-compiler/traceur --experimental --out '+f.dest+' --script ' + f.src[0];
      console.log(cmd);

      exec(cmd, function(error, stdout, stderr){
        if (!error) {
          return;
        }

        console.log(error);
        console.log(stdout);
        console.log(stderr);
      });
    });
  });
};
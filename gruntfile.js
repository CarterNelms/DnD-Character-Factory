module.exports = function(grunt) {
  grunt.initConfig ({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      dist: {
        files: [{
          expand: true,                   // Enable dynamic expansion.
          cwd: 'app/less',                // Src matches are relative to this path.
          src: ['*.less','!_*.less'],     // Actual pattern(s) to match.
          dest: 'app/public/css',         // Destination path prefix.
          ext: '.css',                    // Dest filepaths will have this extension.
        }],
        options: {
          sourcemap: 'none',          // No need for these now
          cacheLocation: 'temp/.less-cache'
        }
      }
    },
    jshint: {
      files: ['gruntfile.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    traceur: {
      build: {
        files: [{
          cwd: 'app/js/es6',
          src: '**/*.es6.js',
          dest: 'app/public/js',
          ext: '.js',
          expand: true
        }]
      }
    },
    ts: {
      default : {
        // src: ["app/app.ts"],
        tsconfig: true
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>', 'app/js/es6/**/*.es6.js'],
        tasks: ['jshint', 'traceur']
      },
      less: {
        files: ['app/less/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false
        }
      },
      jade: {
        files: ['views/**/*.jade'],
        options: {
          data: {
            debug: true,
            timestamp: "<%= grunt.template.today() %>"
          }
        }
      },
      ts: {
        files: ['app/app.ts','tsconfig.json'],
        tasks: ['ts']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-ts");

  grunt.registerTask('default', ['ts','less','jshint','traceur','watch']);

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
module.exports = function(grunt) {
  grunt.initConfig ({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      target: {
        files: [
          {expand: true, cwd: "bower_components/bootstrap/less", src: ["**/*"], dest: "public/css/less/vendor/bootstrap"},
          {expand: true, cwd: "bower_components/bootstrap/dist/js", src: ["bootstrap.min.js"], dest: "public/js/vendor/bootstrap"},
          {expand: true, cwd: "bower_components/dataTables.net/js", src: ["jquery.dataTables.min.js"], dest: "public/js/vendor/dataTables"},
          {expand: true, cwd: "bower_components/dataTables.net-bs/js", src: ["dataTables.bootstrap.min.js"], dest: "public/js/vendor/dataTables"},
          {expand: true, cwd: "bower_components/dataTables.net-bs/css", src: ["dataTables.bootstrap.min.css"], dest: "public/css/vendor/dataTables"},
          {expand: true, cwd: "bower_components/font-awesome/less", src: ["**/*"], dest: "public/css/less/vendor/font-awesome"},
          {expand: true, cwd: "bower_components/font-awesome/fonts", src: ["**/*"], dest: "public/lib/fonts/font-awesome"},
          {expand: true, cwd: "bower_components/iCheck", src: ["iCheck.min.js"], dest: "public/js/vendor/iCheck"},
          {expand: true, cwd: "bower_components/iCheck/skins/minimal", src: ["orange*"], dest: "public/css/vendor/iCheck/minimal"},
          {expand: true, cwd: "bower_components/jquery/dist", src: ["jquery.min.js"], dest: "public/js/vendor/jquery"},
          {expand: true, cwd: "bower_components/select2/dist/js", src: ["select2.full.min.js"], dest: "public/js/vendor/select2"},
          {expand: true, cwd: "bower_components/select2/dist/css", src: ["select2.min.css"], dest: "public/css/vendor/select2"}
        ]
      }
    },
    less: {
      dist: {
        files: [{
          expand: true,                   // Enable dynamic expansion.
          cwd: 'public/css/less',                // Src matches are relative to this path.
          src: ['*.less','!_*.less'],     // Actual pattern(s) to match.
          dest: 'public/css/compiled',             // Destination path prefix.
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
    ts: {
      default : {
        src: ["public/js/ts/angular/**/*.ts"],
        outDir: "public/js/compiled/angular",
        options: {
          experimentalDecorators: true,
          fast: "never",
          sourceMap: false
        }
      }
    },
    traceur: {
      build: {
        files: [{
          cwd: 'public/js/es6',
          src: '**/*.js',
          dest: 'public/js/compiled',
          rename  : function (dest, src) {
            var folder    = src.substring(0, src.lastIndexOf('/'));
            var filename  = src.substring(src.lastIndexOf('/'), src.length);

            filename  = filename.split('.es6.js')[0];

            return dest + '/' + folder + filename + '.js';
          },
          expand: true
        }]
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
        files: ['app/js/ts/**/*.ts','tsconfig.json'],
        tasks: ['ts']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-ts");

  // grunt.registerTask('default', ['copy','less','jshint','traceur','watch']);
  grunt.registerTask('setup', ['ts','copy','less','jshint','traceur']);
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
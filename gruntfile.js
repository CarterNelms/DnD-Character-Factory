module.exports = function(grunt) {
  grunt.initConfig ({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      target: {
        files: [
          {expand: true, cwd: "bower_components/bootstrap/less", src: ["**/*"], dest: "app/lib/less/vendor/bootstrap"},
          {expand: true, cwd: "bower_components/bootstrap/dist/js", src: ["bootstrap.min.js"], dest: "public/js/vendor/bootstrap"},
          {expand: true, cwd: "bower_components/dataTables.net/js", src: ["jquery.dataTables.min.js"], dest: "public/js/vendor/dataTables"},
          {expand: true, cwd: "bower_components/dataTables.net-bs/js", src: ["dataTables.bootstrap.min.js"], dest: "public/js/vendor/dataTables"},
          {expand: true, cwd: "bower_components/dataTables.net-bs/css", src: ["dataTables.bootstrap.min.css"], dest: "public/css/vendor/dataTables"},
          {expand: true, cwd: "bower_components/font-awesome/less", src: ["**/*"], dest: "app/lib/less/vendor/font-awesome"},
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
          cwd: 'app/lib/less',            // Src matches are relative to this path.
          src: ['*.less','!_*.less'],     // Actual pattern(s) to match.
          dest: 'public/css',             // Destination path prefix.
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
    // ts: {
    //   default : {
    //     tsconfig: true,
    //     src: ['app/components/**/*.ts'],
    //     dest: 'app/public/components',
    //     options: {
    //       fast: "never"
    //     }
    //   }
    // },
    traceur: {
      build: {
        files: [{
          cwd: 'app/lib/js/es6',
          src: '**/*.es6.js',
          dest: 'public/js',
          ext: '.js',
          expand: true
        }]
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>', 'app/lib/js/es6/**/*.es6.js'],
        tasks: ['jshint', 'traceur']
      },
      less: {
        files: ['app/lib/less/**/*.less'],
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
      // },
      // ts: {
      //   files: ['app/app.ts','app/components','tsconfig.json'],
      //   tasks: ['ts']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks("grunt-ts");

  // grunt.registerTask('default', ['ts','less','jshint','traceur','watch']);
  grunt.registerTask('default', ['copy','less','jshint','traceur','watch']);

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
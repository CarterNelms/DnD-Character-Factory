(function(global) {
  var map = {
    'app': 'js/ts/angular',
    'typescript': '//cdn.rawgit.com/Microsoft/TypeScript/v1.6.2/lib/typescript.js'
  };
  var packages = {'app': {
      main: 'main',
      defaultExtension: 'ts'
    }};
  var ngPackageNames = [];
  function packIndex(pkgName) {
    packages[("@angular/" + pkgName)] = {
      main: 'index.js',
      defaultExtension: 'js'
    };
  }
  function packUmd(pkgName) {
    packages[("@angular/" + pkgName)] = {
      main: (pkgName + ".umd.js"),
      defaultExtension: 'js'
    };
  }
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    transpiler: 'typescript',
    packages: packages
  };
  System.config(config);
})(this);

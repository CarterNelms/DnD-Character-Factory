'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next) => {
  if (!initialized){
    initialized = true;
    load(req.app, next);
  } else {
    next();
  }
};

function load (app, fn){
  var abilities              = traceur.require(__dirname + '/../routes/abilities.js');
  // var characters              = traceur.require(__dirname + '/../routes/characters.js');
  // var error                   = traceur.require(__dirname + '/../routes/error.js');
  var home                    = traceur.require(__dirname + '/../routes/home.js');
  var partials                = traceur.require(__dirname + '/../routes/partials.js');

  app.get('/', dbg, home.index);
  // app.get('/characters/create', dbg, characters.create);
  app.get('/abilities/get-info', dbg, abilities.getInfo);

  app.get('/partials/:name', partials.index);
  app.get('/partials/abilities/:name', partials.abilities);
  app.get('/partials/characters/:name', partials.characters);
  app.get('/partials/common/:name', partials.common);

  // app.get('*', dbg, error['404']);

  console.log('Routes Loaded');
  fn();
}

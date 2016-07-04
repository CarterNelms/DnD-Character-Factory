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
  var abilities               = traceur.require(__dirname + '/../routes/abilities.js');
  // var characters              = traceur.require(__dirname + '/../routes/characters.js');
  // var error                   = traceur.require(__dirname + '/../routes/error.js');
  var home                    = traceur.require(__dirname + '/../routes/home.js');
  var partials                = traceur.require(__dirname + '/../routes/partials.js');
  var races                   = traceur.require(__dirname + '/../routes/races.js');
  var classes                 = traceur.require(__dirname + '/../routes/classes.js');

  app.get('/', dbg, home.index);
  // app.get('/characters/create', dbg, characters.create);
  app.get('/characters/abilities/get-info', dbg, abilities.getInfo);
  app.get('/characters/races/get', dbg, races.get);
  app.get('/characters/classes/get', dbg, classes.get);

  app.get('/partials/:name', partials.index);
  app.get('/partials/characters/:name', partials.characters);
  app.get('/partials/characters/abilities/:name', partials.abilities);
  app.get('/partials/characters/classes/:name', partials.classes);
  app.get('/partials/characters/races/:name', partials.races);
  app.get('/partials/common/:name', partials.common);

  // app.get('*', dbg, error['404']);

  console.log('Routes Loaded');
  fn();
}

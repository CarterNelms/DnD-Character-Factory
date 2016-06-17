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
  var home                    = traceur.require(__dirname + '/../routes/home.js');
  var error                   = traceur.require(__dirname + '/../routes/error.js');
  var characters              = traceur.require(__dirname + '/../routes/characters.js');

  app.get('/', dbg, home.index);
  app.get('/characters/create', dbg, characters.create);

  // app.get('*', dbg, error['404']);

  console.log('Routes Loaded');
  fn();
}
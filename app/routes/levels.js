'use strict';

var traceur = require('traceur');
var Level =                       traceur.require(__dirname + '/../models/Level.js');

exports.get = (req, res) => {
  Level.find({}).sort('level').exec((err, levels) => {
    res.send(JSON.stringify({
      levels: levels
    }));
  });
};
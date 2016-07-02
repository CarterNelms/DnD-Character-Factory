'use strict';

var traceur = require('traceur');
var Race =                       traceur.require(__dirname + '/../models/Race.js');

exports.getInfo = (req, res) => {
  Race.find({}).sort('name').exec((err, races) => {
    res.send(JSON.stringify({
      races: races
    }));
  });
};
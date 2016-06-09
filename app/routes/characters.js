'use strict';

var traceur = require('traceur');
var Race = traceur.require(__dirname + '/../models/Race.js');

exports.create = (req, res) => {
  Race.findAll (races => {
    res.render('characters/create', { title: 'Create Character', races: races });
  });
};
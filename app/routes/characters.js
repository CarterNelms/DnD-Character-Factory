'use strict';

var traceur = require('traceur');
var Race = traceur.require(__dirname + '/../models/Race.js');
var Class = traceur.require(__dirname + '/../models/Class.js');

exports.create = (req, res) => {
  Race.findAll (races => {
    Class.findAll (classes => {
      res.render('characters/create', { title: 'Create Character', races: races, classes: classes });
    });
  });
};
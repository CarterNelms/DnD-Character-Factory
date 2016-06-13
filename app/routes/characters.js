'use strict';

var traceur = require('traceur');
var Ability =                       traceur.require(__dirname + '/../models/Ability.js');
var AbilityRollMethod =             traceur.require(__dirname + '/../models/AbilityRollMethod.js');
var Class =                         traceur.require(__dirname + '/../models/Class.js');
var Race =                          traceur.require(__dirname + '/../models/Race.js');

exports.create = (req, res) => {
  Race.find ({}).sort('name').exec((err, races) => {
    Class.find ({}).sort('name').exec((err, classes) => {
      Ability.find ({}).sort('order').exec((err, abilities) => {
        AbilityRollMethod.find ({}).sort('order').exec((err, abilityRollMethods) => {
          res.render('characters/create', {
            title: 'Create Character',
            races: races,
            classes: classes,
            abilities: abilities,
            abilityRollMethods: abilityRollMethods
          });
        });
      });
    });
  });
};
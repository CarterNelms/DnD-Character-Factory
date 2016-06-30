'use strict';

var traceur = require('traceur');
var Ability =                       traceur.require(__dirname + '/../models/Ability.js');
var AbilityRollMethod =             traceur.require(__dirname + '/../models/AbilityRollMethod.js');

exports.getInfo = (req, res) => {
  Ability.find ({}).sort('order').exec((err, abilities) => {
    AbilityRollMethod.find ({}).sort('order').exec((err, ability_roll_methods) => {
      res.send(JSON.stringify({
        abilities: abilities,
        ability_roll_methods: ability_roll_methods
      }));
    });
  });
};
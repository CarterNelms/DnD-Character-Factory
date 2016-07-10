/* jshint unused: false */

'use strict';

var mongoose = require('mongoose');
var traceur = require('traceur');
var AbilityScoreIncreaseSchema =              traceur.require(__dirname + '/AbilityScoreIncreaseSchema.js');
var ProficiencySchema =                       traceur.require(__dirname + '/ProficiencySchema.js');

var TraitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ability_score_increases: { type: [AbilityScoreIncreaseSchema], required: false },
  proficiencies: {
    skills: { type: [ProficiencySchema], required: false }
  }
});

module.exports = TraitSchema;
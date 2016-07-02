/* jshint unused: false */

'use strict';

var collectionName = 'race';

var mongoose = require('mongoose');

var AbilityScoreIncrease = new mongoose.Schema({
  ability_id: { type: String, required: true },
  increase: { type: Number, required: true }
});

var Trait = new mongoose.Schema({
  ability_score_increase: { type: [AbilityScoreIncrease], required: false }
});

var Subrace = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  traits: { type: Trait, required: true }
});

var Schema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  traits: { type: Trait, required: true },
  subraces: { type: [Subrace], default: [], required: true }
});

var Model = mongoose.model(collectionName, Schema);

module.exports = Model;

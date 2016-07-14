/* jshint unused: false */

'use strict';

var mongoose = require('mongoose');
var traceur = require('traceur');
var TraitSchema =                   traceur.require(__dirname + '/TraitSchema.js');

var alignments = 'Good Evil Lawful Chaotic Neutral'.split(' ').push('');

var BackgroundSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  traits: { type: [TraitSchema], default: [], required: true },
  info: {
    ties: {
      name: { type: String, required: true },
      list: { type: [String], required: true }
    },
    personality_traits: { type: [String], required: true },
    ideals: {
      name: { type: String, required: true },
      description: { type: String, required: true },
      alignment: { type: String, enum: alignments, default: '', required: true }
    },
    bonds: { type: [String], required: true },
    flaws: { type: [String], required: true }
  }
});

module.exports = BackgroundSchema;
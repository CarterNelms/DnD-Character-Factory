/* jshint unused: false */

'use strict';

var mongoose = require('mongoose');
var traceur = require('traceur');
var SubraceSchema =                 traceur.require(__dirname + '/SubraceSchema.js');
var TraitSchema =                   traceur.require(__dirname + '/TraitSchema.js');

var RaceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  traits: { type: [TraitSchema], default: [], required: true },
  subraces: { type: [SubraceSchema], default: [], required: true }
});

module.exports = RaceSchema;
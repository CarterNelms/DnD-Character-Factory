/* jshint unused: false */

'use strict';

var mongoose = require('mongoose');
var traceur = require('traceur');
var TraitSchema =              traceur.require(__dirname + '/TraitSchema.js');

var SubraceSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  traits: { type: [TraitSchema], default: [], required: true }
});

module.exports = SubraceSchema;
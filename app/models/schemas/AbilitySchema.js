/* jshint unused: false */

'use strict';

var mongoose = require('mongoose');

var AbilitySchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  abbreviation: { type: String, required: true },
  order: { type: Number, default: 9999999, required: true }
});

module.exports = AbilitySchema;
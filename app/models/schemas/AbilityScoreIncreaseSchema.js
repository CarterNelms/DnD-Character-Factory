/* jshint unused: false */

'use strict';

var mongoose = require('mongoose');

var AbilityScoreIncreaseSchema = new mongoose.Schema({
  ability_id: { type: String, default: "", required: true },
  increase: { type: Number, default: 1, required: true }
});

module.exports = AbilityScoreIncreaseSchema;
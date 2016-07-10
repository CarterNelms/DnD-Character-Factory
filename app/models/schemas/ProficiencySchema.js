/* jshint unused: false */

'use strict';

var mongoose = require('mongoose');

var ProficiencySchema = new mongoose.Schema({
  proficiency_ids: { type: [String], default: [], required: true },
  count: { type: Number, default: 0, required: true }
});

module.exports = ProficiencySchema;
/* jshint unused: false */

'use strict';

var mongoose = require('mongoose');

var SkillSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  ability_id: { type: String, required: true },
  name: { type: String, required: true }
});

module.exports = SkillSchema;
/* jshint unused: false */

'use strict';

var mongoose = require('mongoose');

var LevelSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  level: { type: Number, required: true },
  experience_points: { type: Number, required: true }
});

module.exports = LevelSchema;
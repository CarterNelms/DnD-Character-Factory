/* jshint unused: false */

'use strict';

var collectionName = 'ability';

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  abbreviation: { type: String, default: '', required: true },
  order: { type: Number, default: 9999999, required: true }
});

var Model = mongoose.model(collectionName, Schema);

module.exports = Model;

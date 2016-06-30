/* jshint unused: false */

'use strict';

var collectionName = 'ability_roll_method';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, default: '', required: true },
  order: { type: Number, default: 9999999, required: true },
  is_official: { type: Boolean, default: false, required: true },
  is_rollable: { type: Boolean, required: true },
  is_orderability_optional: { type: Boolean, required: true },
  is_orderable: { type: Boolean, required: true },
  is_editable: { type: Boolean, required: true }
});

var Model = mongoose.model(collectionName, schema);

module.exports = Model;

/* jshint unused: false */

'use strict';

var collectionName = 'ability';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String, required: true },
    abbreviation: { type: String, default: '', required: true },
    order: { type: Number, default: 9999999, required: true }
});

var Model = mongoose.model(collectionName, schema);

module.exports = Model;

/* jshint unused: false */

'use strict';

var collectionName = 'race';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String, required: true }
});

var Model = mongoose.model(collectionName, schema);

module.exports = Model;

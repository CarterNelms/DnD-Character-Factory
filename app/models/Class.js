/* jshint unused: false */

'use strict';

var collectionName = 'class';

var mongoose = require('mongoose');

var Schema = new mongoose.Schema({
    name: { type: String, required: true }
});

var Model = mongoose.model(collectionName, Schema);

module.exports = Model;

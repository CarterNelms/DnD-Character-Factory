/* jshint unused: false */

'use strict';

var collectionName = 'ability_roll_method';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '', required: true },
    order: { type: Number, default: 9999999, required: true },
    isOfficial: { type: Boolean, default: false, required: true },
    assignment: { type: String, enum: ['','Choose','Fixed'], default: '', required: true },
    isRollable: { type: Boolean, required: true }
});

var Model = mongoose.model(collectionName, schema);

module.exports = Model;

/* jshint unused: false */

'use strict';

var collectionName = 'class';

var mongoose = require('mongoose');
var traceur = require('traceur');
var ClassSchema =             traceur.require(__dirname + '/schemas/ClassSchema.js');

var Class = mongoose.model(collectionName, ClassSchema);

module.exports = Class;

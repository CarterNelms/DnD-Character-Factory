/* jshint unused: false */

'use strict';

var collectionName = 'backgrounds';

var mongoose = require('mongoose');
var traceur = require('traceur');
var BackgroundSchema =             traceur.require(__dirname + '/schemas/BackgroundSchema.js');

var Background = mongoose.model(collectionName, BackgroundSchema);

module.exports = Background;

/* jshint unused: false */

'use strict';

var collectionName = 'level';

var mongoose = require('mongoose');
var traceur = require('traceur');
var LevelSchema =             traceur.require(__dirname + '/schemas/LevelSchema.js');

var Level = mongoose.model(collectionName, LevelSchema);

module.exports = Level;

/* jshint unused: false */

'use strict';

var collectionName = 'race';

var mongoose = require('mongoose');
var traceur = require('traceur');
var RaceSchema =                 traceur.require(__dirname + '/schemas/RaceSchema.js');

var Race = mongoose.model(collectionName, RaceSchema);

module.exports = Race;

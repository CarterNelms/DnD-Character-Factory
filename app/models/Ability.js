/* jshint unused: false */

'use strict';

var collectionName = 'ability';

var mongoose = require('mongoose');
var traceur = require('traceur');
var AbilitySchema =             traceur.require(__dirname + '/schemas/AbilitySchema.js');

var Ability = mongoose.model(collectionName, AbilitySchema);

module.exports = Ability;

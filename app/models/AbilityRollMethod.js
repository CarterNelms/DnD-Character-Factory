/* jshint unused: false */

'use strict';

var collectionName = 'ability_roll_method';

var mongoose = require('mongoose');
var traceur = require('traceur');
var AbilityRollMethodSchema =             traceur.require(__dirname + '/schemas/AbilityRollMethodSchema.js');

var AbilityRollMethod = mongoose.model(collectionName, AbilityRollMethodSchema);

module.exports = AbilityRollMethod;

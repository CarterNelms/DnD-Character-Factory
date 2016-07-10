/* jshint unused: false */

'use strict';

var collectionName = 'skill';

var mongoose = require('mongoose');
var traceur = require('traceur');
var SkillSchema =             traceur.require(__dirname + '/schemas/SkillSchema.js');

var Skill = mongoose.model(collectionName, SkillSchema);

module.exports = Skill;

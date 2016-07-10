'use strict';

var traceur = require('traceur');
var Skill =                       traceur.require(__dirname + '/../models/Skill.js');

exports.get = (req, res) => {
  Skill.find({}).sort('name').exec((err, skills) => {
    res.send(JSON.stringify({
      skills: skills
    }));
  });
};
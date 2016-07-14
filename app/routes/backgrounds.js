'use strict';

var traceur = require('traceur');
var Background =                       traceur.require(__dirname + '/../models/Background.js');

exports.get = (req, res) => {
  Background.find({}).sort('name').exec((err, backgrounds) => {
    res.send(JSON.stringify({
      backgrounds: backgrounds
    }));
  });
};
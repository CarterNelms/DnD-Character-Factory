'use strict';

var traceur = require('traceur');
var Class =                       traceur.require(__dirname + '/../models/Class.js');

exports.get = (req, res) => {
  Class.find({}).sort('name').exec((err, classes) => {
    res.send(JSON.stringify({
      classes: classes
    }));
  });
};
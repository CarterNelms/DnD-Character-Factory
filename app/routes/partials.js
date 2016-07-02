'use strict';

exports.index = (req, res) => {
  var name = req.params.name;
  res.render('partials/' + name, {});
};

exports.abilities = (req, res) => {
  var name = req.params.name;
  res.render('partials/characters/abilities/' + name, {});
};

exports.characters = (req, res) => {
  var name = req.params.name;
  res.render('partials/characters/' + name, {});
};

exports.common = (req, res) => {
  var name = req.params.name;
  res.render('partials/common/' + name, {});
};

exports.races = (req, res) => {
  var name = req.params.name;
  res.render('partials/characters/races/' + name, {});
};

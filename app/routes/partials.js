'use strict';

exports.index = (req, res) => {
  var name = req.params.name;
  res.render('partials/' + name, {});
};

exports.abilities = (req, res) => {
  var name = req.params.name;
  res.render('partials/characters/abilities/' + name, {});
};

exports.backgrounds = (req, res) => {
  var name = req.params.name;
  res.render('partials/characters/backgrounds/' + name, {});
};

exports.classes = (req, res) => {
  var name = req.params.name;
  res.render('partials/characters/classes/' + name, {});
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

exports.skills = (req, res) => {
  var name = req.params.name;
  res.render('partials/characters/skills/' + name, {});
};

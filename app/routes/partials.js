'use strict';

exports.index = (req, res) => {
  var name = req.params.name;
  res.render('partials/' + name, {});
};

exports.characters = (req, res) => {
  var name = req.params.name;
  res.render('partials/characters/' + name, {});
};

exports.common = (req, res) => {
  var name = req.params.name;
  res.render('partials/common/' + name, {});
};

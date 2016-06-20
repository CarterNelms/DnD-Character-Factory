'use strict';

exports.index = (req, res) => {
  var name = req.params.name;
  console.log("-----======= DELETEME =======-------");
  res.render('partials/' + name, {});
};
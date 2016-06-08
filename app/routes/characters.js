'use strict';

exports.create = (req, res)=>{
  res.render('characters/create', {title: 'Create'});
};
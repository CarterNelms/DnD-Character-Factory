'use strict';

exports['404'] = (req, res) => {
  res.render('error/404', {title: 'Error 404'});
};
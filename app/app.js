'use strict';

var dbname                  = process.env.DBNAME;
var port                    = process.env.PORT || 4000;

// set variables for environment
var traceur                 = require('traceur');
var express                 = require('express');
var app                     = express();
var path                    = require('path');
var initMongo               = traceur.require(__dirname + '/lib/init-mongo.js');
var initRoutes              = traceur.require(__dirname + '/lib/init-routes');

// instruct express to server up static assets
app.use(express.static(__dirname + '/public'));

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/js/vendor', express.static(__dirname + '/js/vendor'));
app.use('/css/vendor', express.static(__dirname + '/css/vendor'));
app.use(initMongo.connect);
app.use(initRoutes);

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

module.exports = app;

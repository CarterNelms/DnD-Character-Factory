'use strict';

var dbname                  = process.env.DBNAME;
var port                    = process.env.PORT || 4000;

// set variables for environment
var traceur                 = require('traceur');
var express                 = require('express');
var app                     = express();
var path                    = require('path');
var initMongo               = traceur.require(__dirname + '/app/config/init-mongo.js');
var initRoutes              = traceur.require(__dirname + '/app/config/init-routes.js');

// instruct express to server up static assets
app.use(express.static(__dirname + '/public'));

// views as directory for all template files
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/jspm_packages', express.static(__dirname + '/jspm_packages'));
app.use(initMongo.connect);
app.use(initRoutes);

var server = require('http').createServer(app);
server.listen(port, function(){
  console.log('Node server listening. Port: ' + port + ', Database: ' + dbname);
});

module.exports = app;

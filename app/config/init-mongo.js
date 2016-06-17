'use strict';

var MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var mongoUrl = `mongodb://localhost/${process.env.DBNAME}`;
var initialized = false;

exports.connect = (req, res, next) => {
  console.log("Mongo URL: " + mongoUrl);
  if (!initialized) {
    initialized = true;
    exports.db(next);
  } else {
    next();
  }
};

exports.db = fn => {
  MongoClient.connect(mongoUrl, (err, db) => {
    if (err) { throw err; }

    mongoose.connect(mongoUrl);

    global.carter = {};
    global.carter.db = db;

    console.log('Connected to MongoDB');
    fn();
  });
};

/* jshint unused: false */

'use strict';

var collection = global.carter.db.collection('classes');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');
var Mongo = require('mongodb');

class Class {
    static findAll (fn) {
        var params = { sort: { name: 1 } };
        Base.findAll(Class, collection, fn, params);
    }
}

module.exports = Class;

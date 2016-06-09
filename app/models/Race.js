/* jshint unused: false */

'use strict';

var collection = global.carter.db.collection('races');
var traceur = require('traceur');
var Base = traceur.require(__dirname + '/base.js');
var Mongo = require('mongodb');

class Race {
    static findAll (fn) {
        Base.findAll(Base, collection, fn);
    }
}

module.exports = Race;

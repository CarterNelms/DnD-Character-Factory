'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

class Base {
  static destroy (Model, collection, id, fn) {
    collection.remove({_id: id}, fn);
  }

  static findAll (Model, collection, fn, params) {
    Base.findByProperties(Model, collection, {}, fn, params);
  }

  static findByProperties(Model, collection, properties, fn, params) {
    var results = collection.find(properties);
    if (params) {
      if(params.sort) {
        results.sort(params.sort);
      }
    }
    results.toArray((e, instances) => {
      instances = instances.map(instance => _.create(Model.prototype, instance));
      fn(instances);
    });
  }

  static findById (Model, collection, id, fn) {
    if (typeof id === 'string') {
      if (id.length !== 24)
      {
        fn(null);
        return;
      }
      id = Mongo.ObjectID(id);
    }

    if (!(id instanceof Mongo.ObjectID)) {
      fn(null);
      return;
    }

    collection.findOne({_id:id}, (e, instance)=> {
      instance = instance ? _.create(Model.prototype, instance) : null;
      fn(instance);
    });
  }

  static save (collection, instance, fn) {
    var callback = instance._id ? () => fn(instance) : (e, instance)=>fn(instance);
    collection.save(instance, callback);
  }
}

module.exports = Base;
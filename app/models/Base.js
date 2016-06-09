'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

class Base {
  static destroy (Model, collection, id, fn) {
    collection.remove({_id: id}, fn);
  }

  static findAll (Model, collection, fn) {
    Base.findByProperties(Model, collection, {}, fn);
  }

  static findByProperties(Model, collection, properties, fn) {
    collection.find(properties).toArray((e, instances) => {
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
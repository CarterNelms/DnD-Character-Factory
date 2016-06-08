'use strict';

var Mongo = require('mongodb');
var _ = require('lodash');

class Base
{
  static destroy(id, collection, fn)
  {
    collection.remove({_id: id}, fn);
  }

  static save(instance, collection, fn)
  {
    if(instance._id)
    {
      collection.save(instance, ()=>fn(instance));
    }
    else
    {
      collection.save(instance, (e, instance)=>fn(instance));
    }
  }
}

module.exports = Base;
/**
* Tags.js
*
* @description :: Model represents tags
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    tagID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      protected: true
    },
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    tagCategories: {
      collection: 'tagCategory',
      via: 'tags'
    },
    restaurantLocations: {
      collection: 'restaurantLocationTag',
      via: 'tag'
    },
    icon: {
      type: 'string',
      required: false
    },
    isDeleted: {
      type: 'boolean',
      required: false,
      defaultsTo: false,
      protected: true
    },
    toJSON : function() {
      var obj = this.toObject();
      if(!obj.isDeleted) {
        delete obj.createdAt;
        delete obj.updatedAt;
        delete obj.isDeleted;
        return obj;
      }
      return null;
    }
  }
};


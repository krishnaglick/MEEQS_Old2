/**
* Tags.js
*
* @description :: Model represents tags
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  protectedAttributes: function () {
      return [ "tagID" ];
  },

  attributes: {
    tagID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    tagCategories: {
      collection: 'tagCategories',
      via: 'tags'
    },
    restaurantLocations: {
      collection: 'restaurantLocations',
      via: 'tags'
    },
    isDeleted: {
      type: 'boolean',
      required: false,
      default: false
    },
    toJSON : function() {
      var obj = this.toObject();
      if(!obj.isDeleted) {
        delete obj.isDeleted;
        return obj;
      }
      return null;
    }
  }
};


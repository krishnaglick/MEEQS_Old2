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
    id: function() {
      return this.tagID;
    },
    name: {
      type: 'string',
      unique: true,
      required: true
    },
    tagCategories: {
      model: 'tagCategories'
    },
    restaurantLocation: {
      model: 'restaurantLocations'
    },
    isDeleted: {
      type: 'boolean',
      required: false,
      defaultsTo: false
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


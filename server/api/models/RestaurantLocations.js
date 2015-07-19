/**
* RestaurantLocations.js
*
* @description :: Model represents restaurant locations
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  protectedAttributes: function () {
      return [ "restaurantLocationID" ];
  },

  attributes: {
    restaurantLocationID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    restaurants: {
      model: 'restaurants'
    },
    tags: {
      model: 'tags',
      columnName: 'tagID',
      type: 'integer'
    },
    ratings: {
      collection: 'ratings',
      via: 'ratingID'
    },
    place_id: {
      type: 'string',
      required: true
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


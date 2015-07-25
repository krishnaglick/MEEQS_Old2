/**
* RestaurantLocations.js
*
* @description :: Model represents restaurant locations
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  protectedAttributes: function () {
      return [ 'restaurantLocationID' ];
  },

  attributes: {
    restaurantLocationID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    restaurant: {
      model: 'restaurants'
    },
    tags: {
      collection: 'tags',
      via: 'restaurantLocation'
    },
    ratings: {
      collection: 'ratings',
      via: 'restaurantLocation'
    },
    place_id: {
      type: 'string',
      required: true,
      unique: true
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


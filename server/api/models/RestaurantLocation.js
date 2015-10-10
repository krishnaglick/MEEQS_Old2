/**
* RestaurantLocation.js
*
* @description :: Model represents restaurant locations
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    restaurantLocationID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      protected: true
    },
    name: {
      type: 'string',
      required: false
    },
    tags: {
      collection: 'tag',
      via: 'restaurantLocations'
    },
    ratings: {
      collection: 'rating',
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
      defaultsTo: false,
      protected: true
    },
    toJSON : function() {
      var obj = this.toObject();
      if(!obj.isDeleted) {
        delete obj.isDeleted;
        delete obj.createdAt;
        delete obj.updatedAt;
        return obj;
      }
      return null;
    }
  },

  getAverageRatings: function(res) {
    Rating.find({restaurantLocationID: this.restaurantLocationID})
    .average('getAverageRating')
    .done((a,b,c,d) => {
      debugger;
      res();
    });
  }
};


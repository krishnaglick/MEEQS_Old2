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
  	restaurantID: {
  		model: 'Restaurants',
  		columnName: 'restaurantID',
  		type: 'integer',
  		required: true
  	},
  	tags: {
  		model: 'Tags',
  		columnName: 'tagID',
  		type: 'integer',
  		required: false
  	},
    ratings: {
      collection: 'Ratings',
      via: 'restaurantLocationID'
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
      return obj.isDeleted ? {} : obj;
    }
  }
};


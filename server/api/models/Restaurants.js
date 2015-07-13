/**
* Restaurants.js
*
* @description :: Model represents restaurants
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  protectedAttributes: function () {
      return [ "restaurantID" ];
  },

  attributes: {
    restaurantID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    name: {
      type: 'string',
      unique: false,
      required: true
    },
    description: {
      type: 'string',
      required: false,
      unique: false
    },
    restaurantLocations: {
      collection: 'restaurantLocations',
      via: 'restaurant'
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
        if(obj.restaurantLocations && obj.restaurantLocations[0] && obj.restaurantLocations[0] == null) {
          obj.restaurantLocations[0] = 'potato';
        }
        return obj;
      }
      return null;
    }
  }
};


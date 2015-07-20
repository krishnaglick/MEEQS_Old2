/**
* Ratings.js
*
* @description :: Model represents restaurant ratings
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  protectedAttributes: function () {
      return [ "ratingID" ];
  },

  attributes: {
    ratingID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    restaurantLocations: {
      model: 'restaurantLocations'
    },
    userID: {
      model: 'Users'
    },
    comment: {
      type: 'string',
      required: false
    },
    language: {
      type: 'string',
      required: false,
      defaultsTo: 'en-US'
    },
    menuSelection: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },
    environment: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },
    costEfficiency: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },
    productQuality: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },
    service: {
      type: 'integer',
      required: true,
      defaultsTo: 0
    },
    isDeleted: {
      type: 'boolean',
      required: false,
      default: false
    },
    getAverageRating : function() {
      return (
        this.menuSelection +
        this.environment +
        this.costEfficiency +
        this.productQuality +
        this.service
      ) / 5;
    },
    toJSON : function() {
      var obj = this.toObject();
      if(!obj.isDeleted) {
        delete obj.isDeleted;
        obj.averageRating = this.getAverageRating();
        return obj;
      }
      return null;
    }
  }
};


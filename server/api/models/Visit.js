/**
* Visit.js
*
* @description :: Model represents number of visits to a restaurant location.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    visitID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      protected: true
    },
    userID: {
      model: 'User'
    },
    restaurantLocationID: {
      model: 'RestaurantLocation'
    },
    visits: {
      type: 'integer',
      defaultsTo: 0
    }
  }
};


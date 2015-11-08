/**
* RestaurantLocationTag.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    RestaurantLocationTagID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      protected: true
    },
    restaurantLocation: {
      model: 'restaurantLocation',
      required: true
    },
    tag: {
      model: 'tag',
      required: true
    }
  }
};


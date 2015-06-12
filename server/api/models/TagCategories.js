/**
* TagCategories.js
*
* @description :: Model represents tag categories
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  protectedAttributes: function () {
      return [ "tagCategoryID" ];
  },

  attributes: {
	tagCategoryID: {
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
  	description: {
  		type: 'string',
  		required: false
  	}
  }
};


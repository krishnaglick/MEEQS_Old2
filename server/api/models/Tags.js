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
  	name: {
  		type: 'string',
  		unique: true,
  		required: true
  	},
  	tagCategoryID: {
  		model: 'Users',
  		columnName: 'tagCategoryID',
  		type: 'integer',
  		required: false
  	}
  }
};


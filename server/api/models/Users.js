/**
* Users.js
*
* @description :: Model represents users
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  protectedAttributes: function () {
      return [ "userID", "isAdmin" ];
  },

  find: function(data){
    return data;
  },

  attributes: {
  	userID: {
  		type: 'integer',
  		index: true,
  		primaryKey: true,
  		unique: true,
  		autoIncrement: true
  	},
  	username: {
  		type: 'string',
  		unique: true,
  		required: true
  	},
  	password: {
  		type: 'string',
  		required: true
  	},
  	email: {
  		type: 'string',
  		required: false
  	},
  	isVerified: {
  		type: 'boolean',
  		defaultsTo: false
  	},
  	isAdmin: {
  		type: 'boolean',
  		defaultsTo: false
  	}
  }
};


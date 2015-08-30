/**
* Roles.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    roleID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true
    },
    roleName: {
    	type: 'string',
    	required: true
    },
    isDeleted: {
    	type: 'boolean',
    	required: false,
    	defaultsTo: false
    },
    users: {
      collection: 'users',
      via: 'roles'
    },
    toJSON: function() {
    	var obj = this.toObject();

    	if(!obj.isDeleted) {
    		delete obj.isDeleted;
    		return obj;
    	}
    	return {};
    }
  }
};


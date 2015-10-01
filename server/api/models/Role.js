/**
* Role.js
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
      autoIncrement: true,
      protected: true
    },
    roleName: {
      type: 'string',
      required: true
    },
    isDeleted: {
      type: 'boolean',
      required: false,
      defaultsTo: false,
      protected: true
    },
    users: {
      collection: 'user',
      via: 'roles'
    },
    //Override
    toJSON: function() {
      var obj = this.toObject();

      if(!obj.isDeleted) {
        return obj;
      }

      return null;
    }
  }
};


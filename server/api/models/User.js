/**
* Users.js
*
* @description :: Model represents users
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');

module.exports = {
  protectedAttributes: function () {
      return [ "userID", "isAdmin" ];
  },

  attributes: {
    userID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      protected: true
    },
    username: {
      type: 'string',
      unique: true,
      required: true,
      protected: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true,
      protected: true
    },
    displayName: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true
    },
    roles: {
      collection: 'role',
      via: 'users'
    },
    isDeleted: {
      type: 'boolean',
      required: false,
      defaultsTo: false,
      protected: true
    },
    //Override
    toJSON : function() {
      var obj = this.toObject();
      if(!obj.isDeleted) {
        delete obj.isDeleted;
        delete obj.roles;
        delete obj.password;
        delete obj.userID;
        delete obj.username;
        return obj;
      }
      return null;
    }
  },
  //Override
  beforeCreate: function(user, cb) {
      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(user.password, salt, function(err, hash) {
              if (err) {
                  console.log(err);
                  cb(err);
              } else {
                  user.password = hash;
                  cb();
              }
          });
      });
  }
};


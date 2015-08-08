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
      autoIncrement: true
    },
    username: {
      type: 'string',
      unique: true,
      required: true
    },
    password: {
      type: 'string',
      minLength: 6,
      required: true
    },
    displayName: {
      type: 'string',
      defaultsTo: ''
    },
    email: {
      type: 'string'
    },
    isVerified: {
      type: 'boolean',
      defaultsTo: false
    },
    isAdmin: {
      type: 'boolean',
      defaultsTo: false
    },
    isDeleted: {
      type: 'boolean',
      required: false,
      defaultsTo: false
    },
    toJSON : function() {
      var obj = this.toObject();
      if(!obj.isDeleted) {
        delete obj.isDeleted;
        delete obj.password;
        return obj;
      }
      return null;
    }
  },
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


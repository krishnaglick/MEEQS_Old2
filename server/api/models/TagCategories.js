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
        return obj;
      }
      return null;
    }
  }
};


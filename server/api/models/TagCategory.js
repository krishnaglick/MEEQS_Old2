/**
* TagCategorie.js
*
* @description :: Model represents tag categories
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    tagCategoryID: {
      type: 'integer',
      index: true,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      protected: true
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
    sort: {
      type: 'integer',
      required: false
    },
    style: {
      type: 'string',
      required: false
    },
    icon: {
      type: 'string',
      required: false
    },
    tags: {
      collection: 'tag',
      via: 'tagCategories'
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
        delete obj.createdAt;
        delete obj.updatedAt;
        delete obj.isDeleted;
        return obj;
      }
      return null;
    }
  }
};


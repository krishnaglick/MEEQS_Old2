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
  		model: 'TagCategories',
  		columnName: 'tagCategoryID',
  		type: 'integer',
  		required: false
  	},
    isDeleted: {
      type: 'boolean',
      required: false,
      default: false
    },
    toJSON : function() {
      var obj = this.toObject();
      return obj.isDeleted ? {} : obj;
    }
  }
};


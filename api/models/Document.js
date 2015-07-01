/**
* Document.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var moment = require('moment');

module.exports = {

  schema: true,

  attributes: {

  	name: {
  		type: 'string',
  		size: 128
  	},

  	description: {
  		type: 'string',
  		size: 255
  	},

    path: {
      type: 'string'
    },

  	category: {
      model: 'category'
    },

    createdDate: {
      type: 'string'
    },

    updatedDate: {
      type: 'string'
    }

  },

  beforeUpdate: function (value, cb) {
    value.updatedDate = moment().format('DD/MM/YYYY');

    cb();
  },

  beforeCreate: function (value, cb) {
    value.createdDate = moment().format('DD/MM/YYYY');
    value.updatedDate = moment().format('DD/MM/YYYY');

    cb();
  }

};


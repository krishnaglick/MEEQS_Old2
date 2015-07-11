/**
 * RestaurantLocationsController
 *
 * @description :: Server-side logic for managing Restaurantlocations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var config = require('../../config/googleplaces.config.js');
var GooglePlaces = require('../../node_modules/googleplaces/index.js');
var googlePlaces = new GooglePlaces(config.apiKey, config.outputFormat);

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil.js'),
  _ = require('lodash');

var getGoogleData = (records, req, res) => {
  var coords = req.cookies.location;

  req.query.types = config.placeTypes;
  req.query.location = coords;
  var bad = 0;
  _.each(records, (record) => {
    if(record && record.placeID) req.query.placeid = record.placeID;
    googlePlaces.placeDetailsRequest(req.query, (err, gRes) => {
        if(err) throw err;
        if(gRes.result) {
          record.googleData = gRes.result;
        }

        bad++;
        if(bad == records.length) {
          res.ok(records);
        }
    });
  });
};

module.exports = {
  find : (req, res) => {
    // Look up the model
    var Model = actionUtil.parseModel(req);
    //debugger;

    // If an `id` param was specified, use the findOne blueprint action
    // to grab the particular instance with its primary key === the value
    // of the `id` param.   (mainly here for compatibility for 0.9, where
    // there was no separate `findOne` action)
    if ( actionUtil.parsePk(req) ) {
      return require('./findOne')(req,res);
    }

    // Lookup for records that match the specified criteria
    var query = Model.find()
      .where( actionUtil.parseCriteria(req) )
      .limit( actionUtil.parseLimit(req) )
      .skip( actionUtil.parseSkip(req) )
      .sort( actionUtil.parseSort(req) );
    // TODO: .populateEach(req.options);
    query = actionUtil.populateEach(query, req);
    //debugger;
    query.exec(function found(err, matchingRecords) {
      if (err) return res.serverError(err);
      getGoogleData(matchingRecords, req, res);
    });
  }
};


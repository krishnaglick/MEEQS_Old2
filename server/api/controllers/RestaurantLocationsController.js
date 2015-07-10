/**
 * RestaurantLocationsController
 *
 * @description :: Server-side logic for managing Restaurantlocations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var config = require('../../config/googleplaces.config.js');
var GooglePlaces = require('../../node_modules/googleplaces/index.js');
var googlePlaces = new GooglePlaces(config.apiKey, config.outputFormat);

module.exports = {
  google : (req, res) => {
    var coords = req.cookies.location;

    req.query.types = config.placeTypes;
    req.query.location = coords;

    googlePlaces.placeSearch(req.query, (err, gRes) => {
      if(err) throw err;
      if(gRes.results.length === 0) {
        res.status(400);
        res.send({
          message: 'Place search must not return 0 results.',
          status: gRes.status,
          error: gRes.error_message
        });
      }
      else {
        res.status(200);
        res.send(gRes.results);
      }
    });
  },

  findRecords : (req, res) => {
    // Look up the model
    var Model = actionUtil.parseModel(req);
    debugger;

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
    query.exec(function found(err, matchingRecords) {
      if (err) return res.serverError(err);
      // Only `.watch()` for new instances of the model if
      // `autoWatch` is enabled.
      if (req._sails.hooks.pubsub && req.isSocket) {
        Model.subscribe(req, matchingRecords);
        if (req.options.autoWatch) { Model.watch(req); }
        // Also subscribe to instances of all associated models
        _.each(matchingRecords, function (record) {
          actionUtil.subscribeDeep(req, record);
        });
      }
      res.ok(matchingRecords);
    });
  }
};


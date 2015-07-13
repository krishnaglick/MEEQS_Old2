/**
 * RestaurantLocationsController
 *
 * @description :: Server-side logic for managing Restaurantlocations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil.js');

var unwantedProperties = [
  'rating',
  'ratings',
  'scope',
  'reference',
  'id',
  'adr_address',
  'formatted_address',
  'international_phone_number',
  'reviews',
  'user_ratings_total',
  'isDeleted'
];

module.exports = {
  find : (req, res) => {
    let searchOptions = req.query;
    searchOptions.location = req.cookies.locations;

    Google.getPlacesNearMe(searchOptions, (err, gRes) => {
      if (err) return res.serverError(err);
      if(gRes.results) {
        mergeGoogleResultsIntoMEEQS(gRes.results, res);
      }
      else {
        res.status(204);
        res.send({message: 'No results'});
      }
    });

    var mergeGoogleResultsIntoMEEQS = (googleData, res) => {
      let Model = actionUtil.parseModel(req);

      if ( actionUtil.parsePk(req) ) {
        return require('./findOne')(req,res);
      }

      var query = Model.find()
        .where( actionUtil.parseCriteria(req) )
        .limit( actionUtil.parseLimit(req) )
        .skip( actionUtil.parseSkip(req) )
        .sort( actionUtil.parseSort(req) );

      query = actionUtil.populateEach(query, req);

      query.exec((err, records) => {
        if (err) return res.serverError(err);

        let cleanedRecords = Utils.deleteUnwantedProperties(records, unwantedProperties);
        let cleanedGoogleData = Utils.deleteUnwantedProperties(googleData, unwantedProperties);

        let mergedResults = Utils.mergeObjectArraysOnProperty(cleanedGoogleData, cleanedRecords, 'place_id');

        res.ok({restaurantLocations: mergedResults});
      });
    };
  },

  findOne : (req, res) => {
    let Model = actionUtil.parseModel(req);
    let pk = actionUtil.requirePk(req);

    var query = Model.findOne(pk);
    query = actionUtil.populateEach(query, req);
    query.exec(function found(err, matchingRecord) {
      if (err) return res.serverError(err);
      if(!matchingRecord) return res.notFound('No record found with the specified `id`.');
      if(!matchingRecord.place_id) matchingRecord.place_id = '';

      Google.getPlaceDetails(matchingRecord.place_id, (err, gRes) => {
        if (err) return res.serverError(err);
        if(gRes.result) {
          let googleData = Utils.deleteUnwantedProperties(gRes.result, unwantedProperties);
          _.merge(matchingRecord, googleData);
          res.ok(matchingRecord);
        }
        else {
          res.status(204);
          res.send({message: 'No results'});
        }
      });
    });
  }
};


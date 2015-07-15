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
var googleRequestParams = [
  'location',
  'radius',
  'rankby',
  'keyword',
  'language',
  'minprice',
  'maxprice',
  'name',
  'opennow',
  'rankby',
  'types',
  'pagetoken',
  'zagatselected'
];

module.exports = {
  find : (req, res) => {
    let googleSearchOptions = Utils.deletePropertiesByWhitelist(req.params, googleRequestParams);
    googleSearchOptions.location = req.cookies.location || googleSearchOptions.location;

    Google.getPlacesNearMe(googleSearchOptions, (err, gRes) => {
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
        return require('./findOne')(req, res);
      }

      if(!req.options) req.options = {};
      if(!req.options.criteria) req.options.criteria = {};
      req.options.criteria.blacklist = googleRequestParams;

      var query = Model.find()
        .where( actionUtil.parseCriteria(req) )
        .limit( actionUtil.parseLimit(req) )
        .skip( actionUtil.parseSkip(req) )
        .sort( actionUtil.parseSort(req) );

      query = actionUtil.populateEach(query, req);

      query.exec((err, records) => {
        if (err) return res.serverError(err);

        let cleanedRecords = Utils.deletePropertiesByBlacklist(records, unwantedProperties);
        let cleanedGoogleData = Utils.deletePropertiesByBlacklist(googleData, unwantedProperties);

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
          let googleData = Utils.deletePropertiesByBlacklist(gRes.result, unwantedProperties);
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


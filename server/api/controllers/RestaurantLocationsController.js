/**
 * RestaurantLocationsController
 *
 * @description :: Server-side logic for managing Restaurantlocations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil.js');

var unwantedProperties = [
  'rating',
  'scope',
  'reference',
  'id',
  'adr_address',
  'formatted_address',
  'international_phone_number',
  'reviews',
  'user_ratings_total',
  'isDeleted',
  'types'
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
  'types',
  'pagetoken',
  'zagatselected'
];

module.exports = {
  find : (req, res) => {
    let googleSearchOptions = _.pick(req.params.all(), googleRequestParams);
    googleSearchOptions.location = req.cookies.location || googleSearchOptions.location;

    Google.getPlacesNearMe(googleSearchOptions, (err, gRes) => {
      if (err) return res.serverError(err);
      if(!gRes || !gRes.results) return res.notFound();

      var place_ids = _.pluck(gRes.results, 'place_id');

      var types = _.uniq(_.flatten(_.pluck(gRes.results, 'types')));
      types = _.map(types, (type) => {
        return {
          name: type
        };
      });
      Tags.create(types, (err, records) => {});

      let Model = actionUtil.parseModel(req);

      Model.find({ where: { place_id: place_ids }})
        .populate('tags')
        .populate('ratings')
        .exec((err, matchingRecords) => {
          if (err) return res.serverError(err);
          if(!matchingRecords) return res.ok(gRes.results);

          //Need to refactor this so the tags are actually attached and the data is returned correctly.
          let mergedResults = Utils.mergeOn(matchingRecords, gRes.results, 'place_id');
          for (var i = mergedResults.length - 1; i >= 0; i--) {
            let types = mergedResults[i].types;
            var q = i;
            Tags.find({name: types}).exec((err, records) => {
              mergedResults[q].tags = mergedResults[q].tags ? _.merge({}, records, mergedResults[q].tags) : records;
              if(q == matchingRecords.length-1) {
                return res.ok({ restaurantLocations: Utils.removePropertiesByBlacklist(mergedResults, unwantedProperties) });
              }
            });
          }
        });
    });
  },

  findOne : (req, res) => {
    let Model = actionUtil.parseModel(req);
    let pk = actionUtil.requirePk(req);

    if(!req.options) req.options = {};
    if(!req.options.criteria) req.options.criteria = {};
    req.options.criteria.blacklist = googleRequestParams;

    var query = Model.findOne(pk);

    query = actionUtil.populateEach(query, req);

    query.exec((err, matchingRecord) => {
      if (err) return res.serverError(err);
      if(!matchingRecord) return res.notFound('No record found with the specified id.');
      if(!matchingRecord.place_id) return res.ok(matchingRecord);

      Google.getPlaceDetails(matchingRecord.place_id, (err, gRes) => {
        if (err) return res.serverError(err);
        if(!gRes || !gRes.result) return res.ok(matchingRecord);

        let data = Utils.mergeOn(matchingRecord, gRes.result, 'place_id', Utils.removePropertiesByBlacklist, unwantedProperties);

        res.ok(data);
      });
    }); 
  }

};


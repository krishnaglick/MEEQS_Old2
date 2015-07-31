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

var unwantedTypes = [
  'establishment',
  'point_of_interest',
  'food',
  'restaurant'
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

      let Model = actionUtil.parseModel(req);

      Model.find({ where: { place_id: place_ids }})
        .populate('tags')
        .populate('ratings')
        .exec((err, matchingRecords) => {
          if (err) return res.serverError(err);
          if(!matchingRecords) return res.ok(Utils.removePropertiesByBlacklist(gRes.results, unwantedProperties));

          //TODO: Refactor
          var improvedRatings = _.map(matchingRecords, (record) => {
            return new Promise((res, rej) => {
              if(!record.ratings || _.isEmpty(record.ratings)) res();
              var changedRatings = _.map(record.ratings, (rating) => {
                return new Promise((res, rej) => {
                  Users.find({where: {userID: rating.user}})
                  .exec((err, user) => {
                    //TODO: Change this to display name when that gets populated.
                    if(!err) rating.user = user[0].username;
                    res();
                  });
                });
              });

              Promise.all(changedRatings).then((vals) => {
                res();
              });
            });
          });

          Promise.all(improvedRatings).then(() => {
            let mergedResults = Utils.mergeOn(matchingRecords, gRes.results, 'place_id');

            for (var i = mergedResults.length - 1; i >= 0; i--) {
              mergedResults[i].tags = mergedResults[i].tags || [];
              for (var q = mergedResults[i].types.length - 1; q >= 0; q--) {
                if(_.contains(unwantedTypes, mergedResults[i].types[q])) break;
                mergedResults[i].tags.push(
                  {
                    name: mergedResults[i].types[q]
                  }
                );
              }
            }

            return res.ok({ restaurantLocations: Utils.removePropertiesByBlacklist(mergedResults, unwantedProperties) });
          });
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

        res.ok({restaurantLocations: data});
      });
    }); 
  }

};


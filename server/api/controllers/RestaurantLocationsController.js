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
      let Model = actionUtil.parseModel(req);

      Model.find({ where: { place_id: place_ids }})
        .populate('restaurant')
        .populate('tags')
        .populate('ratings')
        .exec((err, matchingRecords) => {
          if (err) return res.serverError(err);
          if(!matchingRecords) return res.ok(gRes.results);

          //return res.ok({ restaurantLocations: Utils.mergeOn(matchingRecords, gRes.results, 'place_id', _.omit, unwantedProperties) });
          return res.ok({ restaurantLocations: Utils.mergeOn(matchingRecords, gRes.results, 'place_id') });
        });
    });
  },

  findOne : (req, res) => {
    let Model = actionUtil.parseModel(req);
    let pk = actionUtil.requirePk(req);

    if(!req.options) req.options = {};
    if(!req.options.criteria) req.options.criteria = {};
    req.options.criteria.blacklist = googleRequestParams;
    
    //let associations = actionUtil.getAssociationConfiguration(Model, 'detail');

    var query = Model.findOne(pk);

    //query = actionUtil.populateRecords(query, associations);
    query = actionUtil.populateEach(query, req);

    query.exec((err, matchingRecord) => {
      if (err) return res.serverError(err);
      if(!matchingRecord) return res.notFound('No record found with the specified id.');
      if(!matchingRecord.place_id) return res.ok(matchingRecord);

      Google.getPlaceDetails(matchingRecord.place_id, (err, gRes) => {
        if (err) return res.serverError(err);
        if(!gRes || !gRes.result) return res.ok(matchingRecord);

        let data = _.merge(_.omit(gRes.result, unwantedProperties), _.omit(matchingRecord, unwantedProperties));

        res.ok(data);
      });
    }); 
  }

};


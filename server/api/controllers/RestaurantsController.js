/**
 * RestaurantsController
 *
 * @description :: I am a giant google wrapper.
 * @help        :: https://www.npmjs.com/package/googleplaces
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
  'types',
  
  //Unwanted Types
  'establishment',
  'point_of_interest',
  'food',
  'restaurant'
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
      return res.ok(Utils.removePropertiesByBlacklist(gRes, unwantedProperties));
    });
  }
};


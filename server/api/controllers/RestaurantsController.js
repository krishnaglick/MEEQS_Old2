/**
 * RestaurantsController
 *
 * @description :: I am a giant google wrapper.
 * @help        :: https://www.npmjs.com/package/googleplaces
 */

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
    let googleSearchOptions = _.pick(req.allParams(), googleRequestParams);
    googleSearchOptions.location = req.cookies.location || googleSearchOptions.location;

    Google.getPlacesNearMe(googleSearchOptions, (err, gRes) => {
      if (err) return res.serverError(err);
      if(!gRes || !gRes.results) return res.notFound();

      var place_ids = _.pluck(gRes.results, 'place_id');

      RestaurantLocations.find({ where: { place_id: place_ids }})
      //.populate('tags')
      //.populate('ratings')
      .exec((err, matchingRecords) => {
        if (err) return res.serverError(err);
        if(!matchingRecords || _.isEmpty(matchingRecords)) return res.ok({restaurants: Utils.removePropertiesByBlacklist(gRes.results, unwantedProperties)});

        var mappedRecords = _.map(matchingRecords, (record) => {
          return {
            place_id: record.place_id,
            restaurantLocationID: record.restaurantLocationID
          };
        });

        let mergedResults = Utils.mergeOnAsProperty(mappedRecords, gRes.results, 'place_id', 'restaurantLocation');
        mergedResults = _.map(mergedResults, (result) => {
          if(result.restaurantLocation)
            result.restaurantLocation = result.restaurantLocation.restaurantLocationID;
          return result;
        });
        return res.ok({ restaurants: Utils.removePropertiesByBlacklist(mergedResults, unwantedProperties) });        

        //Ember does not like all of these things.
        /*var improvedRatings = _.map(matchingRecords, (record) => {
          return new Promise((res, rej) => {
            if(!record.ratings || _.isEmpty(record.ratings)) res();
            var changedRatings = _.map(record.ratings, (rating) => {
              return new Promise((res, rej) => {
                Users.find({where: {userID: rating.user}})
                .exec((err, user) => {
                  if(!err) rating.user = (user[0] || user).displayName;
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
          let mergedResults = Utils.mergeOnAsProperty(matchingRecords, gRes.results, 'place_id', 'restaurantLocation');
          return res.ok({ restaurants: Utils.removePropertiesByBlacklist(mergedResults, unwantedProperties) });
        });*/
      });
    });
  },

  findOne : (req, res) => {
    RestaurantLocations.findOne({where: { place_id: req.params}})
    .populate('tags')
    .populate('ratings')
    .exec((err, restaurantLocation) => {
      if(err) return res.serverError(err);

      let improvedRatings = _.map(restaurantLocation.rating, (rating) => {
        return new Promise((res, rej) => {
          if(!record.ratings || _.isEmpty(record.rating)) res();
          Users.find({where: {userID: rating.user}}).exec((err, user) => {
            if(err) res();

            rating.user = user.displayName;
            res();
          });
        });
      });

      Promise.all(improvedRatings).then(() => {
        return res.ok({ restaurantLocations: Utils.removePropertiesByBlacklist(restaurantLocation, unwantedProperties) });
      });
    });
  }
};


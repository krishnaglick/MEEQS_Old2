/**
 * RatingsController
 *
 * @description :: Server-side logic for managing Ratings
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil.js');

 module.exports = {
  find : (req, res) => {
    let Model = actionUtil.parseModel(req);
    
    Model.find()
    .populate('users')
    .exec((err, matchingRecords) => {
      if(err) return res.serverError(err);

      if(matchingRecords) {
        _.map(matchingRecords, (record) => {
          if(record && record.user && record.user.displayName) {
            record.user = { displayName: record.user.displayName };
          }
          else {
            delete record.user;
          }
          return record;
        });

        return res.ok({ ratings: matchingRecords });
      }

      return res.serverError({ error: 'No ratings!' });
    });
  },

  findOne : (req, res) => {
    let Model = actionUtil.parseModel(req);
    let pk = actionUtil.requirePk(req);

    var query = Model.findOne(pk);
    query = actionUtil.populateEach(query, req);

    query.exec((err, matchingRecord) => {
      if (err) return res.serverError(err);

      if(!matchingRecord) return res.serverError({error: 'No rating!'});

      matchingRecord.user = matchingRecord.user ? { displayName: (matchingRecord.user.displayName || '') } : {};

      res.ok({ ratings: matchingRecord });
    });
  },

  create : (req, res) => {
    var Model = actionUtil.parseModel(req);
    var data = actionUtil.parseValues(req, Model);

    //Hack :(
    Users.findOne({where: {userID: data.ratings.user}})
    .exec((err, user) => {
      data.ratings.users = data.ratings.user = user.userID;
      RestaurantLocations.findOne({where: {place_id: data.ratings.restaurantLocation.place_id}})
      .exec((err, loadedData) => {
        if(loadedData.length === 0) {
          RestaurantLocations.create(data.ratings.restaurantLocation)
          .exec((err, newData) => {
            data.ratings.restaurantLocations = data.ratings.restaurantLocation = newData.restaurantLocationID;

            Ratings.create(data.ratings).exec((err, data) => {
              if(err) return res.negotiate(err);
              return res.ok({data: data});
            });
          });
        }
        else {
          data.ratings.restaurantLocations = data.ratings.restaurantLocation = loadedData.restaurantLocationID;

          Ratings.create(data.ratings).exec((err, data) => {
            if(err) return res.negotiate(err);
            return res.ok({data: data});
          });
        }
      });
    });
  }
};

/**
 * RestaurantLocationsController
 *
 * @description :: Server-side logic for managing Restaurantlocations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var actionUtil = require('../../node_modules/sails/lib/hooks/blueprints/actionUtil.js');

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
      var Model = actionUtil.parseModel(req);

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

        var q = Utils.mergeObjectArraysOnProperty(googleData, records, 'place_id');
        debugger;
        res.status(200);
        res.send(q);
      });
    };
  }
};


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
      .populate('user')
      .exec((err, matchingRecords) => {
        if(err) return res.serverError(err);

        if(matchingRecords) {
          _.map(matchingRecords, (record) => {
            if(record && record.user && record.user.username) {
              record.user = {username: record.user.username};
            }
            return record;
          });

          return res.ok({ratings: matchingRecords});
        }

        return res.serverError({error: 'No ratings!'});
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

      matchingRecord.user = matchingRecord.user ? {username: (matchingRecord.user.username || '')} : {};

      res.ok({ratings: matchingRecord});
    });
  }
};


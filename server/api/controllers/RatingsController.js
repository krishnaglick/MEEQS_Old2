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
              record.user = {username: record.user.displayName};
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

      matchingRecord.user = matchingRecord.user ? {username: (matchingRecord.user.displayName || '')} : {};

      res.ok({ratings: matchingRecord});
    });
  },

  create : (req, res) => {
  var Model = actionUtil.parseModel(req);
  var data = actionUtil.parseValues(req, Model);

  Model.create( data ).exec( function created(err, newInstance) {
    if (err) return res.negotiate( err );

    if (req._sails.hooks.pubsub) {
      if (req.isSocket) {
        Model.subscribe(req, newInstance);
        Model.introduce(newInstance);
      }
      Model.publishCreate(newInstance, !req.options.mirror && req);
    }

    // Do a final query to populate the associations of the record.
    var Q = this.findOne(newInstance[Model.primaryKey]);
    Q = actionUtil.populateEach(Q, req);
    Q.exec((err, populatedRecord) => {
      if (err) return res.serverError(err);
      if (!populatedRecord) return res.serverError('Could not find record after updating!');

      res.status(201);

      Users.findOne({where: { userID: populatedRecord.user }}).exec((err, user) => {
        if(err) res.json(actionUtil.emberizeJSON( Model, populatedRecord, req.options.associations, false));

        populatedRecord.user = user.displayName;
        res.json(actionUtil.emberizeJSON( Model, populatedRecord, req.options.associations, false));
      });

      
      
    });
  });

  }
};


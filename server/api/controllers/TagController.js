var actionUtil = require('sails-generate-ember-blueprints/templates/basic/api/blueprints/_util/actionUtil.js');
var performSideload = (sails.config.blueprints.ember && sails.config.blueprints.ember.sideload);

module.exports = {
  create : (req, res) => {
    var Model = actionUtil.parseModel(req);
    var data = actionUtil.parseValues(req, Model);
    var query = Model.findOne({name: data.name});
    query = actionUtil.populateEach(query, req);
    query.exec((err, record) => {
      if(err) return res.serverError({error: 'There was an issue interacting with the database! Please try again.'});
      if(record) return res.ok(record);

      Model.create(data).exec(function created (err, newInstance) {
        if (err) return res.negotiate(err);
        if (req._sails.hooks.pubsub) {
          if (req.isSocket) {
            Model.subscribe(req, newInstance);
            Model.introduce(newInstance);
          }
          Model.publishCreate(newInstance, !req.options.mirror && req);
          return res.created(newInstance);
        }
      });
    });
  },

  findOne : (req, res) => {
    var Model = actionUtil.parseModel(req);
    var pk = actionUtil.requirePk(req);

    var query = Model.findOne(pk);
    query = actionUtil.populateEach(query, req);
    query.exec(function found(err, matchingRecord) {
      if (err) return res.serverError(err);
      if(!matchingRecord) return res.notFound('No record found with the specified `id`.');

      if (sails.hooks.pubsub && req.isSocket) {
        Model.subscribe(req, matchingRecord);
        actionUtil.subscribeDeep(req, matchingRecord);
      }
      return res.ok(matchingRecord);
    });
  },

  find : (req, res) => {
    var Model = actionUtil.parseModel(req);
    var query = Model.find()
      .where(actionUtil.parseCriteria(req))
      .limit(actionUtil.parseLimit(req))
      .skip(actionUtil.parseSkip(req))
      .sort(actionUtil.parseSort(req));

    query.exec(function found(err, matchingRecords) {
      if (err) return res.serverError(err);
      if (req._sails.hooks.pubsub && req.isSocket) {
        Model.subscribe(req, matchingRecords);
        if (req.options.autoWatch) {
          Model.watch(req);
        }
        _.each(matchingRecords, function (record) {
          actionUtil.subscribeDeep(req, record);
        });
      }
      return res.ok(matchingRecords);
    });
  }
};
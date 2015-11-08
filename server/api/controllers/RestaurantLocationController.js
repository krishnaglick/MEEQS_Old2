
var actionUtil = require('sails-generate-ember-blueprints/templates/basic/api/blueprints/_util/actionUtil.js');
var cloneDeep   = require('lodash/lang/cloneDeep.js');
var performSideload = (sails.config.blueprints.ember && sails.config.blueprints.ember.sideload);

module.exports = {
  update : (req, res) => {
    var Model = actionUtil.parseModel(req);
    var pk = actionUtil.requirePk(req);
    var values = actionUtil.parseValues(req, Model);
    Model.findOne(pk).exec(function found(err, matchingRecord) {
      if (err) return res.serverError(err);
      if (!matchingRecord) return res.notFound();
      Model.update(pk, values).exec(function updated(err, records) {
        if (err) return res.negotiate(err);
        if (!records || !records.length || records.length > 1) {
          req._sails.log.warn(
            'Unexpected output from `%s.update`.' +  Model.globalId
         );
        }
        var updatedRecord = records[0];
        if (req._sails.hooks.pubsub) {
          if (req.isSocket) {
            Model.subscribe(req, records);
          }
          Model.publishUpdate(pk, cloneDeep(values), !req.options.mirror && req, {
            previous: matchingRecord.toJSON()
          });
        }
        var query = Model.findOne(updatedRecord[Model.primaryKey]);
        query = actionUtil.populateEach(query, req);
        query.exec(function foundAgain(err, populatedRecord) {
          if (err) return res.serverError(err);
          if (!populatedRecord) return res.serverError('Could not find record after updating!');
          return res.ok(populatedRecord);
        });
      });
    });
  }
};


/**
 * Utils Service
 *
 * @description :: General functionality needed around the app.
 * @help        :: http://github.com/KrishnaGlick/MEEQS_Sane
 */

 var _ = require('lodash');

 module.exports = {

  mergeOn : (uno, dos, property, mod = (i) => i, props = []) => {
    var alpha = uno.length > dos.length ? uno : dos;
    var beta = uno.length > dos.length ? dos : uno;

    for (var i = alpha.length - 1; i >= 0; i--) {
      if(!alpha[i]) break;

      for (var q = beta.length - 1; q >= 0; q--) {
        if(!beta[q]) break;

        alpha[i] = mod(alpha[i], props);
        beta[q] = mod(beta[q], props);
        
        if(alpha[i][property] == beta[q][property]) {
          _.merge(alpha[i], beta[q]);
          delete beta[q];
          break;
        }
      }
    }

    return alpha;
  },

  mergeOnAsProperty : (uno, dos, matchProp, asProp, mod = (i) =>  i, props = []) => {
    var alpha = uno.length > dos.length ? uno : dos;
    var beta = uno.length > dos.length ? dos : uno;

    for (var i = alpha.length - 1; i >= 0; i--) {
      if(!alpha[i]) break;

      for (var q = beta.length - 1; q >= 0; q--) {
        if(!beta[q]) break;

        alpha[i] = mod(alpha[i], props);
        beta[q] = mod(beta[q], props);
        
        if(alpha[i][matchProp] == beta[q][matchProp]) {
          alpha[i][asProp] = beta[q];
          delete beta[q];
          break;
        }
      }
    }
  },

  removePropertiesByBlacklist : (alpha, blacklist) => {
    if(!alpha) return alpha;

    if(_.isArray(alpha)) {
      for (var i = alpha.length - 1; i >= 0; i--) {
        alpha[i] = Utils.removePropertiesByBlacklist(alpha[i], blacklist);
      }
    }
    else if(typeof alpha === 'object') {
      _.each(alpha, (val, key) => {
        if(_.contains(blacklist, key)) {
          delete alpha[key];
        }
        else if(typeof alpha[key] === 'object') {
          alpha[key] = Utils.removePropertiesByBlacklist(alpha[key], blacklist);
        }
      });
    }

    return alpha;
  },

  removePropertiesByWhitelist : (alpha, whitelist) => {
    if(!alpha) return alpha;

    if(_.isArray(alpha)) {
      for (var i = alpha.length - 1; i >= 0; i--) {
        alpha[i] = Utils.removePropertiesByWhitelist(alpha[i], whitelist);
      }
    }
    else if(typeof alpha === 'object') {
      _.each(alpha, (val, key) => {
        if(!_.contains(whitelist, key)) {
          delete alpha[key];
        }
        else if(typeof alpha[key] === 'object') {
          alpha[key] = Utils.removePropertiesByWhitelist(alpha[key], whitelist);
        }
      });
    }

    return alpha;
  },

  deepPopulate : (baseModel, associations, conditions = {}) => {
    baseModel = typeof(baseModel) === 'string' ? sails.models[baseModel.toLowerCase()] : baseModel;
    var populates = _.map(associations, (association) => {
      return _.isArray(association) ? association : association.split('.');
    });
    /*[
      ['ratings', 'user'],
      ['tags']
      ]
    */

    /*
    Load all items in base model.
    Loop over all items in base model =>
      Loop over all items in populates
        If populateItem.length == 1
          Get value of baseModelItem[populateItem[0]]
          Get model[populateItem[0]] and load values for it
            Set value of baseModelItem[populateItem[0]] to loaded value
        If populate item.length > 1
          Call deepPopulate with model[populateItem[0]] and _.rest(populate item)
    */

    return new Promise((alphaRes, alphaRej) => {

      var baseModelAction = baseModel.find();
      _.each(populates, (assoc) => { //Setup initial associations.
        baseModelAction.populate(assoc[0]);
      });

      baseModelAction.exec((err, vals) => {

        if(err) alphaRej(err);

        var promises = [];

        _.each(vals, (val, n) => {

          _.each(populates, (assoc, i) => {

            if(val[assoc[0]]) { //Has association.
              promises.push(
                new Promise((res, rej) => {
                  if(assoc.length > 1) {
                    console.log('We must go deeper! ', _.rest(assoc));
                    Utils.deepPopulate(sails.models[assoc[0]], _.rest(assoc))
                    .then((data) => {
                      if(assoc[0] == 'users')
                        console.log('We went deeper. ', data);
                      val[assoc[0]] = data;
                      res();
                    });
                  }
                  else {
                    console.log('We have arrived! ', assoc);
                    sails.models[assoc[0]].find({where: {id: val[assoc[0]]}})
                    .exec((err, data) => {
                      val[assoc[0]] = data;
                      res();
                    });
                  }
                })
              );
            }

          });

          Promise.all(promises).then(() => {
            console.log('All done!');
            alphaRes(vals);
          });

        });
      });
    });



    /*return new Promise((res, rej) => {
      baseModel.find(conditions)
      .exec((err, values) => {
        var promises = [];
        for (var i = values.length - 1; i >= 0; i--) {
          for (var q = populates.length - 1; q >= 0; q--) {
            if(populates[q].length == 1) {
              if(!values[i][populates[q]][0]) break;

              var associationToReplace = values[i][populates[q]][0];
              promises.push(new Promise((res, rej) => {
                sails.models[populates[q][0]].findOne({associationToReplace})
                .exec((err, val) => {
                  if(err || i < 0 || q < 0) return res();
                  //debugger;
                  values[i][populates[q]][0] = val;
                  return res();
                });
              }));
            }
            else {
              promises.push(
                Utils.deepPopulate(sails.models[populates[q][0]], _.rest(populates[q]))
                );
            }
          }
        }
        Promise.all(promises)
        .then(res(values));
      });
    });*/
}
};
/**
 * Utils Service
 *
 * @description :: General functionality needed around the app.
 * @help        :: http://github.com/KrishnaGlick/MEEQS_Sane
 */

var _ = require('lodash');

module.exports = {
  mergeObjectArraysOnProperty : (alpha, omega, property) => {
    if(!alpha || !omega) return alpha || omega;
    for(var i = alpha.length - 1; i >= 0; i--) {
      if(property in alpha[i]) {
        for(var q = omega.length - 1; q >= 0; q--) {
          if(property in omega[q]) {
            if(alpha[i][property] == omega[q][property]) {
              _.merge(alpha[i], omega[q]);
              delete omega[q];
              break;
            }

          }
        }
      }
    }

    return alpha;
  },

  deleteUnwantedProperties : (alpha, properties) => {
    if(!alpha) return alpha;

    if(Array.isArray(alpha)) {
      for (var i = alpha.length - 1; i >= 0; i--) {
        alpha[i] = Utils.deleteUnwantedProperties(alpha[i], properties);
      }
    }
    else {
      _.each(properties, (property) => {
        delete alpha[property];
      });
    }

    return alpha;
  }
};
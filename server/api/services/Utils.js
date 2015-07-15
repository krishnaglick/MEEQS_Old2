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

  deletePropertiesByBlacklist : (alpha, blacklist) => {
    if(!alpha) return alpha;

    if(Array.isArray(alpha)) {
      for (var i = alpha.length - 1; i >= 0; i--) {
        alpha[i] = Utils.deletePropertiesByBlacklist(alpha[i], blacklist);
      }
    }
    else {
      _.each(blacklist, (property) => {
        delete alpha[property];
      });
    }

    return alpha;
  },

  deletePropertiesByWhitelist : (alpha, whitelist, cleanedObject = {}) => {
    _.each(whitelist, (property) => {
      if(property in alpha) {
        cleanedObject[property] = alpha[property];
      }
    });
    return cleanedObject;
  }
};
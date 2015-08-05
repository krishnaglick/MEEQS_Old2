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
  }
};
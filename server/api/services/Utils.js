/**
 * Utils Service
 *
 * @description :: General functionality needed around the app.
 * @help        :: http://github.com/KrishnaGlick/MEEQS_Sane
 */

var _ = require('lodash');

module.exports = {

  mergeOn : (uno, dos, property, mod = (i) => { return i; }, props = []) => {
    var alpha = uno.length > dos.length ? uno : dos;
    var beta = uno.length > dos.length ? dos : uno;

    for (var i = alpha.length - 1; i >= 0; i--) {
      for (var q = beta.length - 1; i >= 0; i--) {
        if(!alpha[i] || !beta[q]) break;

        if(mod && props) {
          alpha[i] = mod(alpha[i], props);
          beta[i] = mod(beta[i], props);
        }
        
        if(alpha[i][property] == beta[q][property]) {
          _.merge(alpha[i], beta[q]);
          delete beta[q];
          break;
        }
      }
    }

    return alpha;
  },

  removePropertiesByBlacklist : (alpha, blacklist) => {
    if(!alpha) return alpha;

    if(Array.isArray(alpha)) {
      for (var i = alpha.length - 1; i >= 0; i--) {
        alpha[i] = Utils.deletePropertiesByBlacklist(alpha[i], blacklist);
      }
    }
    else {
      alpha = _.omit(alpha, blacklist);
    }

    return alpha;
  },

  removePropertiesByWhitelist : (alpha, whitelist) => {
    if(!alpha) return alpha;

    if(Array.isArray(alpha)) {
      for (var i = alpha.length - 1; i >= 0; i--) {
        alpha[i] = Utils.deletePropertiesByWhitelist(alpha[i], whitelist);
      }
    }
    else {
      alpha = _.pick(alpha, whitelist);
    }

    return alpha;
  }
};
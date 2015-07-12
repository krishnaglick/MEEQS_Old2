/**
 * Utils Service
 *
 * @description :: General functionality needed around the app.
 * @help        :: http://github.com/KrishnaGlick/MEEQS_Sane
 */

var _ = require('lodash');

module.exports = {
  mergeObjectArraysOnProperty : (alpha, omega, property) => {
    for(var i = alpha.length - 1; i >= 0; i--) {
      if(property in alpha[i]) {
        for(var q = omega.length - 1; q >= 0; q--) {
          if(property in omega[q]) {

            if(alpha[i][property] == omega[q][property]) {
              _.merge(alpha[i], omega[q]);
            }

          }
        }
      }
    }

    return alpha;
  }
};
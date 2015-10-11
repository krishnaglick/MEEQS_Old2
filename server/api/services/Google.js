/**
 * Places Near Me Service
 *
 * @description :: Receives location coordinates and search options, and
 *                 returns restaurants near that location.
 * @help        :: http://github.com/KrishnaGlick/MEEQS_Sane
 */

var config = require('../../config/googleplaces.config.js');
var GooglePlaces = require('../../node_modules/googleplaces/index.js');
var googlePlaces = new GooglePlaces(config.apiKey, config.outputFormat);


module.exports = {
  getPlacesNearMe : (searchOptions, callback) => {
    searchOptions.types = config.placeTypes;
    searchOptions.rankby = 'distance';
    searchOptions.location = searchOptions.location || config.defaultLocation;

    if(searchOptions.location && typeof searchOptions.location == "string"){
        searchOptions.location = searchOptions.location.split(',').map(Number);
    }

    googlePlaces.placeSearch(searchOptions, callback);
  },

  getPlaceDetails : (place_id, callback) => {
    googlePlaces.placeDetailsRequest({placeid: place_id}, callback);
  },

  getDefaultLocation : () => {
    return config.defaultLocation;
  }
};
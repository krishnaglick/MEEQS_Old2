(function () {
    "use strict";

    exports.apiKey = process.env.GOOGLE_PLACES_API_KEY || "AIzaSyALJ2HzrbmrjgIMRKu7VzcY3508_6FcVWU";
    exports.outputFormat = process.env.GOOGLE_PLACES_OUTPUT_FORMAT || "json";
    exports.placeTypes = [
    	'bakery',
    	'bar',
    	'cafe',
    	'meal_delivery',
    	'meal_takeaway',
    	'restaurant'
    ].join('|');

})();
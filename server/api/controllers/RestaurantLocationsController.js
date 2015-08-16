/**
 * restaurantLocationsController
 *
 * @description :: Make ratings do what I want...
 * @help        :: Ask!
 */

module.exports = {
  find : (req, res) => {
    var associations = [
      'ratings.users',
      'tags'
    ];

    if(true) {
      Utils.deepPopulate(RestaurantLocations, associations)
      .then((data) => {
        return res.ok({restaurantLocations: data});
      });
    }
    
    RestaurantLocations.find()
    .populate('ratings')
    .populate('tags')
    .exec((err, results) => {
      if(err) return res.serverError(err);

      return res.ok({restaurantLocations: results});
    });
  }
};
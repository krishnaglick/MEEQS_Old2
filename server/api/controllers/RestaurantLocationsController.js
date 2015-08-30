/**
 * restaurantLocationsController
 *
 * @description :: Make ratings do what I want...
 * @help        :: Ask!
 */

module.exports = {
  	find : (req, res) => {
  		RestaurantLocations.find()
  		.populate('ratings')
  		.exec((err, restaurantLocations) => {
  			return res.ok({restaurantLocations: restaurantLocations});
  		});
  	}
};
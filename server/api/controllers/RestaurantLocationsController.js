/**
 * restaurantLocationsController
 *
 * @description :: Make ratings do what I want...
 * @help        :: Ask!
 */

module.exports = {
	find : (req, res) => {
		var associations = [
			'ratings.user',
			'tags'
		];
		debugger;
		Utils.deepPopulate(RestaurantLocations, associations);
		RestaurantLocations.find()
		.populate('ratings')
		.exec((err, results) => {
			if(err) return res.serverError(err);

			return res.ok({restaurantLocations: results});
		});
	}
};
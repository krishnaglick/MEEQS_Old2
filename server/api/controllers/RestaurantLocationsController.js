/**
 * restaurantLocationsController
 *
 * @description :: Make ratings do what I want...
 * @help        :: Ask!
 */

module.exports = {
  find : (req, res) => {
    var associations = [
      ['ratings', 'users'],
      ['tags']
    ];

    /*RestaurantLocations.find()
    .populate('tags')
    .exec((err, vals) => {
      return res.ok({restaurantLocations: vals});
    });*/

    if(true) {
      Utils.deepPopulate('restaurantLocations', associations)
      .then((data) => {
        console.log('--------------------------------');
        return res.ok({restaurantLocations: data});
      });
    }
    
    /*RestaurantLocations.find()
    .populate('ratings')
    .populate('tags')
    .exec((err, results) => {
      if(err) return res.serverError(err);

      return res.ok({restaurantLocations: results});
    });*/
  }
};
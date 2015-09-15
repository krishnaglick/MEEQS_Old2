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
  },

  findOne : (req, res) => {
    let targetRestaurantLocation = req.param('id');
    RestaurantLocations.findOne(targetRestaurantLocation)
    .populate('tags')
    .populate('ratings')
    .exec((err, restaurantLocation) => {
      if(err) return res.serverError(err);
      if(!restaurantLocation) return res.notFound({ error: 'No records' });

      var promises = [];
      for (let i = restaurantLocation.ratings.length - 1; i >= 0; i--) {
        promises.push(
          new Promise((res, rej) => {
            if(!restaurantLocation.ratings[i] || _.isEmpty(restaurantLocation.ratings[i])) {
              res();
            }

            Users.find(restaurantLocation.ratings[i].users).exec((err, user) => {
              if(err) res();

              restaurantLocation.ratings[i].users = user.displayName || 'Anonymous';
              res();
            });
          })
        );
      }

      Promise.all(promises).then(() => {
        return res.ok({ restaurantLocations: restaurantLocation });
      });
    });
  }
};
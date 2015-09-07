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

      let improvedRatings = _.map(restaurantLocation.rating, (rating) => {
        return new Promise((res, rej) => {
          if(!record.ratings || _.isEmpty(record.ratings)) res();
          Users.find({where: {userID: rating.user}}).exec((err, user) => {
            if(err) res();

            rating.user = user.displayName;
            res();
          });
        });
      });

      Promise.all(improvedRatings).then(() => {
        return res.ok({ restaurantLocations: restaurantLocation });
      });
    });
  }
};
module.exports = {
  find : (req, res) => {
    return res.ok({
      restaurantLocations: [
        {
          restaurantLocationID: 1,
          name: 'A Retaurant',
          rating: {
            menuSelection: 2.5,
            environment: 1.2,
            costEfficiency: 2.9,
            productQuality: 3,
            service: 0.9,
            averageRating: 2.1
          },
          place_id: 'some google place id'
        },
       {
          restaurantLocationID: 2,
          name: 'Another Retaurant',
          rating: {
            menuSelection: 1,
            environment: 2,
            costEfficiency: 3,
            productQuality: 2,
            service: 1,
            averageRating: 1.8
          },
          place_id: 'some other google place id'
        }
      ]
    });
  },

  findOne : (req, res) => {
    //TODO: Mock define.
    return res.ok({
      restaurantLocation: {
        
      }
    });
  }
};


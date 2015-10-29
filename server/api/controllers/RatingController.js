
module.exports = {
  /* Need non-find and non-findOne blueprints for create. */
  searchByComments : (req, res) => {
    let searchValues = req.allParams().text;

    if(!searchValues) return res.badRequest({error: 'Need a text parameter in request!'});

    Rating.find({comment: {'contains': searchValues.split(',')}})
    .exec((err, ratings) => {
      if(err) return res.serverError(err);

      if(ratings.length < 1) return res.notFound({error: 'No results'});

      return res.ok({'ratings': ratings});
    });
  },

  optionsSearchByComments : (req, res) => {
    var optionsObject = {
      'Request Details': {
        'Type': 'get, post',
        'Allowed Query String Parameters': 'text',
        'Allowed Post Parameters': 'text',
        'Example Routes': [
          '/api/v1/searchByComments?text=asdf',
          '/api/v1/searchByComments?text=amazing food',
          '/api/v1/searchByComments?text=mexican, chorizo',
        ]
      },
      'Response Details': {
        'ratings': [
          {
            'restaurantLocation': 3,
            'user': 2,
            'ratingID': 2,
            'comment': 'A Comment',
            'language': 'en-US',
            'menuSelection': 4,
            'environment': 4,
            'costEfficiency': 4,
            'productQuality': 4,
            'service': 4,
            'averageRating': 4
          },
          {
            'restaurantLocation': 4,
            'user': 1,
            'ratingID': 6,
            'comment': 'Another Comment',
            'language': 'en-US',
            'menuSelection': 2,
            'environment': 2,
            'costEfficiency': 3,
            'productQuality': 1,
            'service': 2,
            'averageRating': 2
          }
        ]
      }
    };

    return res.ok(optionsObject);
  }
};


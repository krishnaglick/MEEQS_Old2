
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
  }
};


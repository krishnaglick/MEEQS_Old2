import DS from 'ember-data';

export default DS.Model.extend({
  ratingID: DS.attr(),

  language: DS.attr(),
  createdAt: DS.attr('string'),
  averageRating: DS.attr('number'),

  comment: DS.attr(),
  menuSelection: DS.attr('number'),
  environment: DS.attr('number'),
  costEfficiency: DS.attr('number'),
  productQuality: DS.attr('number'),
  service: DS.attr('number'),

  restaurantLocation: DS.belongsTo('restaurant-location', {
    async: true
  }),

  user: DS.belongsTo('user', {
    async: true
  })
});

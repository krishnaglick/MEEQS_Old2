import DS from 'ember-data';

export default DS.Model.extend({
  ratingID: DS.attr(),
  restaurantLocationID: DS.attr(),
  userID: DS.attr(),
  comment: DS.attr(),
  language: DS.attr(),
  menuSelection: DS.attr('number'),
  environment: DS.attr('number'),
  costEfficiency: DS.attr('number'),
  quality: DS.attr('number'),
  service: DS.attr('number')
});

import DS from 'ember-data';

export default DS.Model.extend({
  ratingID: DS.attr(),
  restaurantLocationID: DS.attr(),
  userID: DS.attr(),
  comment: DS.attr(),
  language: DS.attr(),
  menuSelection: DS.attr(),
  environment: DS.attr(),
  costEfficiency: DS.attr(),
  service: DS.attr('number')
});

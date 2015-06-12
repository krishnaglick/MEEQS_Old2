import DS from 'ember-data';

export default DS.Model.extend({
  restaurantLocationID: DS.attr(),
  restaurantID: DS.attr(),
  tags: DS.attr(),
  placeID: DS.attr('string')
});

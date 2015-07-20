import DS from 'ember-data';

export default DS.Model.extend({
  restaurantID: DS.attr(),
  name: DS.attr(),
  description: DS.attr('string'),
  restaurantLocations: DS.hasMany('restaurant-location')
});

import DS from 'ember-data';

export default DS.Model.extend({
    restaurantLocationID: DS.attr(),

    tags: DS.attr(),
    ratings: DS.attr(),

    restaurantLocation: DS.belongsTo('restaurant-location'),
});

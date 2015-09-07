import DS from 'ember-data';

export default DS.Model.extend({
    restaurantLocationID: DS.attr(),

    tags: DS.attr(),
    ratings: DS.attr(),

    restaurant: DS.belongsTo('restaurant'),
});

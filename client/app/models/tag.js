import DS from 'ember-data';

export default DS.Model.extend({
    tagID: DS.attr('number'),
    name: DS.attr('string'),
    tagCategory: DS.belongsTo('tag-category'),
    restaurantLocations: DS.hasMany('restaurant-location')
});

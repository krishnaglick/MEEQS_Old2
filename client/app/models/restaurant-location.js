import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    restaurantLocationID: DS.attr(),

    tags: DS.attr(),
    ratings: DS.hasMany('rating'),

    restaurant: DS.belongsTo('restaurant')
});

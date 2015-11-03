import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    restaurantLocationID: DS.attr('number'),

    tags: DS.hasMany('tag'),
    ratings: DS.hasMany('rating'),

    restaurant: DS.belongsTo('restaurant')
});

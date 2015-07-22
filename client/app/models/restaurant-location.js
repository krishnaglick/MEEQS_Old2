import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    restaurantLocationID: DS.attr(),
    restaurant: DS.attr(),
    tags: DS.attr(),
    placeID: DS.attr('string'),

    softLoad: DS.attr('boolean'),
    photo_reference: DS.attr('string')
});

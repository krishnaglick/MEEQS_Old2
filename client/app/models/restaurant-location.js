import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
    restaurantLocationID: DS.attr(),
    placeID: DS.attr('string'),
    name: DS.attr('string'),

    tags: DS.attr(),
    ratings: DS.attr(),

    softLoad: DS.attr('boolean'),
    hardLoad: DS.attr('boolean'),
    photo_reference: DS.attr('string'),
    latitude: DS.attr('string'),
    longitude: DS.attr('string'),

    location: function(){
        return {
            latitude: this.get('latitude'),
            longitude: this.get('longitude')
        };
    }.property('latitude', 'longitude')
});

import DS from 'ember-data';

export default DS.Model.extend({
    place_id: DS.attr('string'),
    name: DS.attr('string'),
    vicinity: DS.attr('string'),
    open_now: DS.attr('boolean'),

    photos: DS.attr(),
    types: DS.attr(),

    restaurantLocationData: DS.belongsTo('restaurant-location-data'),

    latitude: DS.attr('string'),
    longitude: DS.attr('string'),

    location: function(){
        return {
            latitude: this.get('latitude'),
            longitude: this.get('longitude')
        };
    }.property('latitude', 'longitude')
});

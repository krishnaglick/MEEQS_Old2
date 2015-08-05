import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'item'],
    isExpanded: false,
    photoUrl: Ember.computed(function(){
        return this.get('google-service').getGooglePhotoURL(this.get('location').get('photo_reference'));
    }),
    directionsUrl: Ember.computed(function(){
        let locationService = this.get('location-service');

        let currentLocation = locationService.latLngToString(locationService.getLocation());
        let targetLocation = locationService.latLngToString(this.get('location').get('location'));
        return this.get('google-service').getGoogleDirectionsURL(currentLocation, targetLocation);
    }),
    actions: {
        toggleExpand(){
            new Promise((resolve/*, reject*/) => {
                var restaurantLocation = this.get('location');

                if(restaurantLocation.get('restaurantLocationData')){
                    resolve();
                } else {
                    var restaurantLocationData = this.store.createRecord('restaurant-location-data');
                    restaurantLocationData.set('restaurantLocation', restaurantLocation);
                    restaurantLocationData.save().then((data) => {
                        restaurantLocation.set('restaurantLocationData', data);
                        resolve();
                    });
                }
            }).then(() => {
                this.set('isExpanded', !this.get('isExpanded'));
            });
        }
    }
});

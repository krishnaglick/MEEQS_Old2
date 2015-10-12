import Ember from 'ember';

export default Ember.Component.extend({
    classNameBindings: ['isExpanded:sixteen:four', 'apply:wide', 'apply:column'],
    apply: true,
    isExpanded: false,
    photoUrl: Ember.computed(function(){
        return this.get('google-service').getGooglePhotoURL(this.get('restaurant').get('photo_reference'));
    }),
    directionsUrl: Ember.computed(function(){
        let locationService = this.get('location-service');

        let currentLocation = locationService.latLngToString(locationService.getLocation());
        let targetLocation = locationService.latLngToString(this.get('restaurant').get('location'));
        return this.get('google-service').getGoogleDirectionsURL(currentLocation, targetLocation);
    }),
    actions: {
        toggleExpand(){
            new Promise((resolve) => {
                this.set('loading', true);

                var restaurant = this.get('restaurant');
                var location = restaurant.get('restaurantLocation');
                if(!location){
                    restaurant.reload().then(() => {
                        if(!restaurant.get('restaurantLocation')){
                            this.store.createRecord('restaurant-location', {
                                restaurant: restaurant
                            }).save().then(resolve);
                        } else {
                            resolve();
                        }
                    });
                } else if(!location.get('ratings.isLoaded')){
                    location.reload().then(resolve);
                } else {
                    resolve();
                }
            }).then(() => {
                this.set('loading', false);
                var expanded = !this.get('isExpanded');
                this.set('isExpanded', expanded);
                if(expanded){
                    Ember.run.later(() => {
                        Ember.$('html, body').animate({ scrollTop: Ember.$(this.get('element')).offset().top }, 'fast');
                    }, 100);
                }
            }, (error) => {
                console.log(error);
                alert(error);
                this.set('loading', false);
            });
        },
        rate(restaurant){
            this.sendAction('rate', restaurant);
        }
    }
});

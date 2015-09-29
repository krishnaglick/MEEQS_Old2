import Ember from 'ember';

export default Ember.Component.extend({
    classNameBindings: ['isExpanded:sixteen:four', 'apply:wide', 'apply:column'],
    closeDiv: '</div>',
    openDiv: '<div class=\'ui four column doubling stackable grid\'>',
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
            new Promise((res) => {
                var restaurant = this.get('restaurant');
                if(restaurant.get('restaurantLocation')){
                    res();
                } else {
                    this.store.find('restaurant', restaurant.get('id')).then((loadedRestaurant) => {
                        restaurant = loadedRestaurant;
                        res();
                    });
                }
            }).then(() => {
                var expanded = !this.get('isExpanded');
                this.set('isExpanded', expanded);
                if(expanded){
                    Ember.run.later(() => {
                        Ember.$('html, body').animate({ scrollTop: Ember.$(this.get('element')).offset().top }, 'fast');
                    }, 100);
                }
            });
        },
        rate(restaurant){
            this.sendAction('rate', restaurant);
        }
    }
});

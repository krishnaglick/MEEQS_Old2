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
    toggleExpand() {
      new Promise((res) => {
        var restaurant = this.get('location');
        if(restaurant.get('restaurantLocation')){
          res();
        } else {
          this.store.find('restaurant', restaurant.get('id')).then((loadedRestaurant) => {
            restaurant = loadedRestaurant;
            res();
          });
        }
      }).then(() => {
        this.set('isExpanded', !this.get('isExpanded'));
      });
    }
  }
});

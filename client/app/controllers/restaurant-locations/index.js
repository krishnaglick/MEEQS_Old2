import Ember from 'ember';

export default Ember.Controller.extend({
    //convert me to a mixin later
    searchParams: {},
    actions: {
        searchLocations(){
            this.transitionToRoute('restaurant-locations.results');
        },
        clearSearch(){
            this.set('searchParams', {});
            this.transitionToRoute('restaurant-locations.results');
        }
    }
});

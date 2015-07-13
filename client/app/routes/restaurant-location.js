import Ember from 'ember';

export default Ember.Route.extend({
    model(params){
        return this.store.find('restaurant-location', params.restaurantID);
        //return this.store.find('restaurant-location', params.restaurantLocationID);
    }
});

import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        return this.store.find('restaurant');
        //return this.store.find('restaurant-location');
    }
});
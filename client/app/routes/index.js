import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        Ember.store = this.store;
        return this.store.find('restaurant-location');
    }
});

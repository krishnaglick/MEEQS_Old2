import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        let controller = this.controllerFor('restaurant-locations.index');
        let searchParams = controller.get('searchParams');
        return this.store.find('restaurant-location', searchParams);
    }
});

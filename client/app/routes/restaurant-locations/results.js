import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        let controller = this.controllerFor('restaurant-locations.index');
        let searchParams = controller.get('searchParams');
        return this.store.find('restaurant-location', searchParams);
        /*
        return [
            {restaurantLocationID: 1, address: "asdf"},
            {restaurantLocationID: 1, address: "f"},
            {restaurantLocationID: 1, address: "dd"},
            {restaurantLocationID: 1, address: "s"},
            {restaurantLocationID: 1, address: "a"},
            {restaurantLocationID: 1, address: "fdsa"},
        ]
        */
    }
});

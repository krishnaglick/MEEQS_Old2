import Ember from 'ember';

export default Ember.Controller.extend({
    //convert me to a mixin later
    searchParams: {},
    actions: {
        loadDetail(restaurantLocation){
            //service later hardLoadModel()
            if(restaurantLocation.get('id')) {
                //debugger;
            }
            if(restaurantLocation.get('isNew')){
                //debugger;
                restaurantLocation.set('tags', undefined);

                restaurantLocation.save().then(function(data){
                    restaurantLocation.set('hardLoad', true);
                });
            } else if(!restaurantLocation.get('hardLoad')){
                this.store.find('restaurant-location', restaurantLocation.get('id')).then(function(data){
                    //debugger;
                    restaurantLocation = data;
                    restaurantLocation.set('hardLoad', true);
                });
            }
        },
        setFilter(){
            this.set('model', this.store.find('restaurant-location', this.get('searchParams')));
        },
        clearFilter(){
            this.set('searchParams', {});
            this.send('setFilter');
        }
    }
});

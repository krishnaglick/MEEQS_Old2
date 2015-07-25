import Ember from 'ember';

export default Ember.Controller.extend({
    //convert me to a mixin later
    searchParams: {},
    actions: {
        setFilter(){
            this.set('model', this.store.find('restaurant-location', this.get('searchParams')));
        },
        clearFilter(){
            this.set('searchParams', {});
            this.send('setFilter');
        },
        loadDetail(restaurantLocation){
            if(restaurantLocation.get('softLoad')){
                //service later
                var location = this.store.createRecord('restaurantLocation', restaurantLocation.toJSON());

                //temp
                location.set('tags', undefined);
                
                var postback = location.save().then(function(data){
                    console.log(data);
                });
            }
        }
    }
});

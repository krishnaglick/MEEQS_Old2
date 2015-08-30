import Ember from 'ember';

export default Ember.Controller.extend({
    //convert me to a mixin later
    searchParams: {},
    actions: {
        setFilter(){
            this.set('model', this.store.find('restaurant', this.get('searchParams')));
        },
        clearFilter(){
            this.set('searchParams', {});
            this.send('setFilter');
        }
    }
});

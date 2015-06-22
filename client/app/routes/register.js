import Ember from 'ember';

export default Ember.Route.extend({
    model: function(){
        return this.store.createRecord('user');
    },
    actions: {
        willTransition() {
            this.get('currentModel').unloadRecord();
        }
    }
});

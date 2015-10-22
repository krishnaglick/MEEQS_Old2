import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    tagName: '',
    messages: [],
    model: {},
    loading: false,
    onOpen: function(){
        //update modal code later to use better code
        if(this.get('open')){
            var model = this.set('model', this.store.createRecord('rating')).get('model');
            model.set('restaurantLocation', this.get('restaurant.restaurantLocation'));
            if(this.get('session.isAuthenticated')){
                model.set('user', this.session.content.secure.user);
            }
        } else {
            this.set('loading', false);
            Ember.run.later(() => {
                this.set('errors', []);
            }, 500);
        }
    }.observes('open'),
    actions: {
        rate() {
            this.set('loading', true);
            this.set('messages', []);

            this.get('model').save().then(() => {
                this.send('cancel');
            }, (error) => {
                this.set('messages', error);
                this.set('loading', false);
            });
            return false;
        },
        cancel() {
            this.set('open', false);
        }
    }
});

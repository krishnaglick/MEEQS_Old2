import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    tagName: '',
    messages: [],
    model: {},
    loading: false,
    onOpen: function(){
        if(this.get('open')){
            this.set('model', this.store.createRecord('rating'));
        } else {
            this.set('loading', false);
            this.send('cancel');
            Ember.run.later(() => {
                this.set('errors', []);
            }, 500);
        }
    }.observes('open'),
    actions: {
        rate() {
            this.set('loading', true);
            this.set('messages', []);

            var model = this.get('model');
            model.set('restaurantLocation', this.get('restaurant.restaurantLocation'));
            model.set('user', this.get('session.data.authenticated.user'));
            model.save().then(() => {
                this.set('model', undefined);
                this.send('cancel');
            }, (error) => {
                this.set('messages', [error]);
                this.set('loading', false);
            });
            return false;
        },
        cancel() {
            if(this.get('model')){
                this.get('model').destroyRecord();
            }
            if(this.get('open')){
                this.set('open', false);
            }
        }
    }
});

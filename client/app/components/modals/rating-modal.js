import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),

    tagName: '',
    messages: [],
    model: {},
    loading: false,
    onOpen: function(){
        if(this.get('open')){
            this.set('model', this.store.createRecord('rating', { user: this.get('session.user') }));
        }
    }.observes('open'),
    actions: {
        rate() {
            this.set('loading', true);
            this.set('messages', []);
            this.get('model').save().then(() => {
                this.send('cancel');
            }, (error) => {
                this.set('messages', [error]);
                this.set('loading', false);
            });
            return false;
        },
        cancel() {
            this.set('loading', false);
            this.set('open', false);
            Ember.run.later(() => {
                this.set('model',{});
                this.set('messages', []);
            }, 500);
        }
    }
});

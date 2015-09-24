import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    messages: [],
    model: {},
    loading: false,
    actions: {
        login: function() {
            this.set('loading', true);
            var credentials = this.get('model');
            this.set('messages', []);
            this.get('session').authenticate('authenticator:passport', credentials)
                .then(() => {
                    this.send('cancel');
                }, (error) => {
                    this.set('messages', [error]);
                    this.set('loading', false);
                });
            return false;
        },
        cancel: function() {
            this.set('open', false);
            Ember.run.later(() => {
                this.set('messages', []);
            }, 500);
        }
    }
});
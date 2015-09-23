import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    messages: [],
    init(){
        this._super();
        this.set('model', {});
    },
    actions: {
        register: function() {
            var credentials = {
                username: this.get('model.username'),
                password: this.get('model.password')
            };
            this.set('messages', []);
            this.store.createRecord('user', credentials).save().then(() => {
                this.get('session').authenticate('authenticator:passport', credentials)
                    .then(() => {
                        this.send('cancel');
                    }, (error) => {
                        this.set('messages', error);
                    });
            });
            return false;
        },
        cancel: function() {
            this.set('messages', []);
        }
    }
});
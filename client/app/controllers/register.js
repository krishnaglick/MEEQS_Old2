import Ember from 'ember';

export default Ember.Controller.extend({
    messages: [],
    actions: {
        register(){
            var credentials = {
                username: this.get('model.username'),
                password: this.get('model.password')
            };
            this.set('messages', []);
            this.model.save().then(() => {
                this.get('session').authenticate('authenticator:passport', credentials)
                    .then(() => {
                        this.transitionToRoute('index');
                    }, (error) => {
                        this.set('messages', error);
                    });
            });
        },
        cancel(){
            this.set('messages', []);
        }
    }
});

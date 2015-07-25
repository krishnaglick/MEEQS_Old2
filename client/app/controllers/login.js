import Ember from 'ember';

export default Ember.Controller.extend({
    messages: [],
    actions: {
        login(){
            var credentials = this.get('model');
            this.set('message', '');
            this.get('session').authenticate('authenticator:passport', credentials)
                .then(() => {
                    this.transitionToRoute('index');
                }, (error) => {
                    this.set('messages', [error]);
                });
        },
        cancel(){
            this.transitionToRoute('index');
        }
    }
});

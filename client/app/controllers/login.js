import Ember from 'ember';

export default Ember.Controller.extend({
    message: '',
    actions: {
        login: function(credentials){
            this.set('message', '');
            this.get('session').authenticate('authenticator:passport', credentials)
                .then(() => {
                    this.transitionToRoute('index');
                }, (error) => {
                    this.set('message', error);
                });
        }
    }
});

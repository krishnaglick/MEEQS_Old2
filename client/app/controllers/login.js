import Ember from 'ember';

export default Ember.Controller.extend({
    message: undefined,
    actions: {
        login: function(credentials){
            this.message = "";
            this.get('session').authenticate('authenticator:passport', credentials)
                .then(() => {
                    this.transitionToRoute('index');
                }, () => {
                    this.message = "Login failed.";
                });
        }
    }
});
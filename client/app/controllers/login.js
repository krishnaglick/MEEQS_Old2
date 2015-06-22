import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        login: function(credentials){
            this.get('session').authenticate('authenticator:passport', credentials);
        }
    }
});
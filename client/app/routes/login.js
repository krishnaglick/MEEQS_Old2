import Ember from 'ember';

export default Ember.Route.extend({
    login: function(){
        this.get('session').authenticate('authenticator:login', {});
    }
});

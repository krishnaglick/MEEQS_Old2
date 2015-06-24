import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        register: function(){
            var credentials = {
                username: this.model.get('username'),
                password: this.model.get('password')
            }
            this.model.save().then(() => {
                this.get('session').authenticate('authenticator:passport', credentials)
                    .then(() => {
                        this.transitionToRoute('index');
                    });
            });
        }
    }
});
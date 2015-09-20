import Ember from 'ember';

export default Ember.Controller.extend({
    messages: [],
    actions: {
        approve(view) {
            var credentials = {
                username: this.get('model.username'),
                password: this.get('model.password')
            };
            this.set('messages', []);
            this.get('session').authenticate('authenticator:passport', credentials)
                .then(() => {
                    view.execute('hide');
                }, (error) => {
                    this.set('messages', [error]);
                });
        },
        deny(view){
            this.set('messages', []);
            view.execute('hide');
        }
    }
});

import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        return {
            username: '',
            password: ''
        };
    },
    renderTemplate(){
        new Promise((resolve, reject) => {
            this.render('login', {
                into: 'application',
                outlet: 'modal'
            });
            resolve();
        }).then(() => {
            $('.modal').modal('show');
        });
    },
    actions: {
        willTransition() {
            $('.modal').modal('hide');
            return this.disconnectOutlet({
                parentView: 'application',
                outlet: 'modal'
            });
        }
    }
});

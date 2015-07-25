import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        return this.store.createRecord('user');
    },
    renderTemplate(){
        new Promise((resolve, reject) => {
            this.render('register', {
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
            this.get('currentModel').unloadRecord();
            $('.modal').modal('hide');
            return this.disconnectOutlet({
                parentView: 'application',
                outlet: 'modal'
            });
        }
    }
});

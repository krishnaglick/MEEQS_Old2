import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        register: function() {
            this.model.save().then(()=>{
                this.transitionToRoute('index');
            });
        }
    }
});
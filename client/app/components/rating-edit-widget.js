import Ember from 'ember';

export default Ember.Component.extend({
    isEditing: false,
    actions: {
        edit(){
            this.set('isEditing', true);
        },
        submit(){
            this.sendAction('submit');
        },
        cancel(){
            this.set('isEditing', false);
            this.sendAction('cancel');
        }
    }
});

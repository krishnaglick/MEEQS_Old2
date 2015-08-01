import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    suppressClose: false,
    actions: {
        submit(){
            this.sendAction('submit');
        },
        cancel(){
            this.sendAction('cancel');
        }
    }
});

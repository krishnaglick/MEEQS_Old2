import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'modal'],
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

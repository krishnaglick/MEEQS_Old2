import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'modal'],
    suppressClose: false,
    actions: {
        ok(){
            this.sendAction('ok');
        },
        cancel(){
            this.sendAction('cancel');
        }
    }
});

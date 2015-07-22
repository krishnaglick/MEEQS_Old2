import Ember from 'ember';

export default Ember.Component.extend({
    tagName: '',
    suppressClose: false,
    actions: {
        ok(){
            this.sendAction('ok');
        },
        cancel(){
            if(!this.get('suppressClose')){
                this.sendAction('closeModal');
            }
            this.sendAction('cancel');
        },
        closeModal(){
            this.sendAction('closeModal');
        }
    }
});

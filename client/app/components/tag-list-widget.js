import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'labels'],

    editable: true,

    actions: {
        addTag(){
            this.get('modal-service').openTag(this.get('model'));
        }
    }
});

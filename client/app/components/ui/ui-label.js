import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'label'],
    actions: {
        click(){
            this.sendAction();
        }
    }
});

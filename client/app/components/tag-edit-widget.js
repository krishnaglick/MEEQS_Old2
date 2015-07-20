import Ember from 'ember';

export default Ember.Component.extend({
    editing: false,
    categoryOptions: ['a type', 'another type', 'a third type'],
    newTag: {},
    actions: {
        addTag(){
            this.set('newTag', this.store.createRecord('tag'));
            this.set('editing', true);
        },
        createTag(){
            this.sendAction();
        },
        submit(){
            this.set('editing', false);
        }
    }
});

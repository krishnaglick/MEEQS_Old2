import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'multiple', 'dropdown'],
    tagOtions: Ember.computed(function(){
        return this.store.findAll('tag');
    }),
    didInsertElement(){
        this._super();
        this.$().dropdown({
            allowAdditions: true
        });
    }
});

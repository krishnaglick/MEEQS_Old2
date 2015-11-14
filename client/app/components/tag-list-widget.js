import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'labels'],
    tagOptions: [],
    actions: {
        addTagOption(value, text, element){
            console.log(value);
        },
        addTag(){
            this.set('adding', true);
            this.set('newTag', this.store.createRecord('tag'));
        },
        cancelTag(){
            this.set('adding', false);
            this.get('newTag').destroyRecord();
        },
        saveTag(){
            this.set('adding', false);
            var newTag = this.get('newTag');
            newTag.set('restaurantLocation', this.get('model'));
            newTag.save();
        }
    },
    onAdding: Ember.computed('adding', function(){
        if(this.get('adding')){
            if(!this.get('tagOptions')){
                this.set('tagOptions', this.store.findAll('tag'));
            }
        }
    })
});

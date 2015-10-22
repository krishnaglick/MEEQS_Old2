import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'a',
    classNameBindings: ['always:ui', 'tag.style', 'always:label'],

    always: true,
    deletable: true,

    actions: {
        removeTag(){
            this.set('removing', true);
        },
        cancelRemove(){
            this.set('removing', false);
        },
        confirmRemove(){
            this.get('tag').destroyRecord();
        }
    }
});

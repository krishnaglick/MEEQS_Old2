import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'labels'],
    actions: {
        addTag: function(){
            this.sendAction('addTag');
        },
        //potentially should be handled at a lower level by a {{tag-widget}}
        removeTag: function(tagID){
            this.sendAction('removeTag', tagID);
        }
    }
});

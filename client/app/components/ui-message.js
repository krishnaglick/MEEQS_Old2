import Ember from 'ember';

export default Ember.Component.extend({
    messages: [],
    classNames: ['ui', 'message'],
    classNameBindings: ['isVisible::hidden', 'color'],
    isVisible: Ember.computed('messages', function(){
        return this.get('messages') && this.get('messages').length > 0;
    })
});

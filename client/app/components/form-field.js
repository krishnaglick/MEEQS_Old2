import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['field'],
    isTextarea: Ember.computed('type', function() {
        return this.get('type') === 'textarea';
    }),
    isDropdown: Ember.computed('type', function() {
        return this.get('type') === 'dropdown';
    })
});

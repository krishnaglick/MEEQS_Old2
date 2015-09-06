import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['field'],
    init(){
        this._super();
        this.set('enabled', typeof this.get('enabled') !== 'undefined' ? this.get('enabled') : true);
    },
    isEmpty: Ember.computed('type', function(){
        return !this.get('type');
    }),
    isTextarea: Ember.computed('type', function() {
        return this.get('type') === 'textarea';
    }),
    isDropdown: Ember.computed('type', function() {
        return this.get('type') === 'dropdown';
    }),
    actions: {
        approve() {
            this.sendAction();
        }
    }
});

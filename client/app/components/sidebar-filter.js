import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'right', 'sidebar', 'inverted', 'vertical', 'menu'],
    actions: {
        setFilter(){
            this.sendAction('setFilter');
        },
        clearFilter(){
            this.sendAction('clearFilter');
        }
    }
});

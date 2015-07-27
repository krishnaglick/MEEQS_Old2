import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'right', 'sidebar', 'inverted', 'vertical', 'menu', 'form'],
    actions: {
        setFilter(){
            this.sendAction('setFilter');
            //HACK
            Ember.$('.ui.sidebar#filtermenu').sidebar('hide');
        },
        clearFilter(){
            this.sendAction('clearFilter');
            //HACK
            Ember.$('.ui.sidebar#filtermenu').sidebar('hide');
        }
    }
});

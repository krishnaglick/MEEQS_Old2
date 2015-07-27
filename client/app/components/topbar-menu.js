import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'inverted', 'icon', 'menu'],
    actions: {
        toggleSidebarMenu: function(){
            //HACK
            Ember.$('.ui.sidebar#sidemenu').sidebar('show');
        },
        toggleSidebarFilter: function(){
            //HACK
            Ember.$('.ui.sidebar#filtermenu').sidebar('show');
        }
    }
});

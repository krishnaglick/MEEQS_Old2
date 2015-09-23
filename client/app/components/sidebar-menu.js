import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'sidebar', 'inverted', 'vertical', 'menu'],
    actions: {
        invalidateSession(){
            this.get('session').invalidate('authenticator:passport');
        },
        closeSidebar(){
            Ember.$('.ui.sidebar#sidemenu').sidebar('hide');
        },
        login(){
            this.set('loginOpen', !this.get('loginOpen'));
        },
        register(){
            this.set('registerOpen', !this.get('registerOpen'));
        }
    }
});

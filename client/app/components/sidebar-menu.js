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
            this.send('closeSidebar');
            this.get('modal-service').openLogin();
        },
        register(){
            this.send('closeSidebar');
            this.get('modal-service').openRegister();
        }
    }
});

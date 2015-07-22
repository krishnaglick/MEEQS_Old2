import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'sidebar', 'inverted', 'vertical', 'menu'],
    actions: {
        invalidateSession(){
            this.get('session').invalidate('authenticator:passport');
        },
        openModal(routeName){
            this.sendAction('openModal', routeName);
        },
        closeModal(){
            this.sendAction('closeModal');
        }
    }
});

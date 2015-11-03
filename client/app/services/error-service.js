import Ember from 'ember';

export default Ember.Service.extend({
    loginOpen: false,
    registerOpen: false,
    openLogin: function(){
        this.set('loginOpen', !this.get('loginOpen'));
    },
    openRegister: function(){
        this.set('registerOpen', !this.get('registerOpen'));
    }
});

import Ember from 'ember';
import ModalRouteMixin from '../../mixins/ModalRouteMixin';

export default Ember.Route.extend(ModalRouteMixin, {
    modal: {
        route: 'register',
        routeOnClose: 'index'
    },
    model(){
        return this.store.createRecord('user');
    }
});

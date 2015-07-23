import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['ui', 'divided', 'items'],
    actions: {
        loadDetail(restaurantLocation){
            this.sendAction('loadDetail', restaurantLocation);
        }
    }
});

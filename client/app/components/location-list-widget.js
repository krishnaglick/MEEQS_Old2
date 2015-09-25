import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        rate(restaurant){
            this.sendAction('rate', restaurant);
        }
    }
});

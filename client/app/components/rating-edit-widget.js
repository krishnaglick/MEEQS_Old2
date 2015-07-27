import Ember from 'ember';

export default Ember.Component.extend({
    store: Ember.inject.service(),
    isEditing: false,
    messages: [],
    actions: {
        edit(){
            this.set('model', Ember.store.createRecord('rating'));
            this.set('isEditing', true);
        },
        saveRating(){
            var model = this.get('model');

            //HACK model associations later
            model.set('user', this.get('session').content.secure.user.userID);
            model.set('restaurantLocation', this.get('location').get('id'));

            model.save().then((data) => {
                this.set('isEditing', false);
                
                //HACK model associations later
                this.get('location').get('ratings').push(data);
            });
        },
        cancel(){
            this.set('model', {});
            this.set('isEditing', false);
            this.sendAction('cancel');
        }
    }
});

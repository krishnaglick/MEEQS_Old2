import Ember from 'ember';

export default Ember.Component.extend({
    isEditing: false,
    messages: [],
    actions: {
        edit(){
            this.set('model', this.store.createRecord('rating'));
            this.set('isEditing', true);
        },
        saveRating(){
            var model = this.get('model');

            //HACK model associations later
            model.set('user', this.get('session').content.secure.user.userID);
            model.set('restaurantLocation', {
                place_id: this.get('location.id'),
                name: this.get('location.name')
            });

            model.save().then((data) => {
                this.set('isEditing', false);
                
                //HACK model associations later
                this.get('location.ratings').push(data);
            });
        },
        cancel(){
            this.set('model', {});
            this.set('isEditing', false);
            this.sendAction('cancel');
        }
    }
});

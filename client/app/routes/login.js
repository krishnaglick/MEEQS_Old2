import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        login: function(){
            this.set("serverErrors", undefined);
            $.post("/login",
                this.getProperties("username", "password")
            ).then(function(successData) {
                console.log(successData);
                this.transitionTo('index');
            }, function(errorData){
                console.log(errorData);
                this.set("serverErrors", errorData);
            });
        }
    }
});

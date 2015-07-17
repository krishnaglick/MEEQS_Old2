import Ember from 'ember';
import DS from 'ember-data';
import google from '../services/google';

export default DS.Model.extend({
    restaurantLocationID: DS.attr(),
    restaurant: DS.attr(),
    tags: DS.attr(),
    placeID: DS.attr('string'),

    photo_reference: DS.attr('string'),
    photo: Ember.computed(function(){
        return "http://placehold.it/300x200";
        //google.getGooglePhotoURL(this.get('photo_reference'));
    })
});

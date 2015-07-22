import Ember from 'ember';
import google from '../services/google';

export default Ember.Component.extend({
    classNames: ['ui', 'item'],
    photo: Ember.computed(function(){
        return "http://placehold.it/300x200";
        //google.getGooglePhotoURL(this.get('photo_reference'));
    }),
    directionsUrl: Ember.computed(function(){
        return 'www.google.com';
    })
});

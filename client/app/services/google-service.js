import Ember from 'ember';
import config from 'client/config/environment';

export default Ember.Service.extend({
    getGooglePhotoURL(photoReference){
        if(photoReference){
            return `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&sensor=false&maxheight=${config.GOOGLE.PHOTO_HEIGHT}&maxwidth=${config.GOOGLE.PHOTO_WIDTH}&key=${config.GOOGLE.API_KEY}`;
        }
        return config.GOOGLE.DEFAULT_PHOTO;
    },
    getGoogleDirectionsURL(startLocation, destinationLocation){
        return `https://www.google.com/maps/dir/${startLocation}/${destinationLocation}/`;
    }
});
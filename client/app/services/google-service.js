import Ember from 'ember';
import config from 'client/config/environment';

export default Ember.Service.extend({
    getGooglePhotoURL(photoReference){
        if(photoReference && config.APP.REQUEST_GOOGLE_IMAGES){
            return `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&sensor=false&maxheight=${config.APP.GOOGLE.PHOTO_HEIGHT}&maxwidth=${config.APP.GOOGLE.PHOTO_WIDTH}&key=${config.APP.GOOGLE.API_KEY}`;
        }
        return config.APP.GOOGLE.DEFAULT_PHOTO;
    },
    getGoogleDirectionsURL(startLocation, destinationLocation){
        return `https://www.google.com/maps/dir/${startLocation}/${destinationLocation}/`;
    }
});

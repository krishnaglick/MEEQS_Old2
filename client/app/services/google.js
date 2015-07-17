import Ember from 'ember';
import config from 'client/config/environment';

export default Ember.Service.extend({
    getGooglePhotoURL: function(photoReference){
        if(photoReference){
            return String.format("https://maps.googleapis.com/maps/api/place/photo?photoreference={0}&sensor=false&maxheight={1}&maxwidth={2}&key={4}",
                photoReference,
                config.GOOGLE.PHOTO_HEIGHT,
                config.GOOGLE.PHOTO_WIDTH,
                config.GOOGLE.API_KEY
            );
        }
        return config.GOOGLE.DEFAULT_PHOTO;
    }
});
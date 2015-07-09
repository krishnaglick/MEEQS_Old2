import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['cookie'],
    init(){
        //TODO: put this in a service
        this.get('geolocation').getGeoposition().then((latLng) => {
            let combinedLatLng = `${latLng.coords.latitude},${latLng.coords.longitude}`;
            this.get('cookie').setCookie('location', combinedLatLng);
        });
    },
    actions: {
        invalidateSession: function(){
            this.get('session').invalidate('authenticator:passport');
        }
    }
});

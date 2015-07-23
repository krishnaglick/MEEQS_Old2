import Ember from 'ember';

export default Ember.Controller.extend({
    init(){
        this._super();
        //TODO: put this in a service
        this.get('geolocation').getGeoposition().then((latLng) => {
            this.get('location-service').setLocation(latLng.coords)
        });
    }
});

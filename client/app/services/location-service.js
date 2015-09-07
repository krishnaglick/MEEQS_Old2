import Ember from 'ember';

export default Ember.Service.extend({
    needs: ['cookie'],
    getLocation(){
        return this.stringToLatLng(
            this.get('cookie').getCookie('location')
        );
    },
    setLocation(location){
        this.get('cookie').setCookie('location', this.latLngToString(location));
    },
    latLngToString(latitude, longitude){
        if(!latitude){
            return latitude;
        }
        if(latitude.constructor === String){
            return latitude;
        } else if(latitude.constructor === Array){
            longitude = latitude[1];
            latitude = latitude[0];
        } else if(typeof latitude === 'object'){
            longitude = latitude.longitude;
            latitude = latitude.latitude;
        }
        return `${latitude},${longitude}`;
    },
    stringToLatLng(latLngString){
        let arr = latLngString.split(',');
        return {
            latitude: arr[0],
            longitude: arr[1]
        };
    }
});
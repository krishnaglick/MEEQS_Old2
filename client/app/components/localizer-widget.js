import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'button',
    classNames: ['ui', 'button'],
    actions: {
        setLocation: function(){
            //eh, wip
            let combinedLatLng = `${latLng.coords.latitude},${latLng.coords.longitude}`;
            this.get('cookie').setCookie('location', combinedLatLng);
        }
    }
});

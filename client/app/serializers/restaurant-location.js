import AppSerializer from './application';

export default AppSerializer.extend({
    primaryKey: 'restaurantLocationID',
    extractArray(store, type, payload){

        //this doesn't need to be done here now; look into extractSingle
        payload['restaurantLocations'].forEach((result, index, array) => {
            var item = array[index];

            if(item.photos){
                item.photo_reference = item.photos[0].photo_reference;
            }

            item.placeID = item.place_id;
            item.latitude = item.geometry.location.lat;
            item.longitude = item.geometry.location.lng;
            delete item.id;
            delete item.geometry;
            delete item.place_id;
        });

        return this._super(store, type, payload);
    },
    serialize(snapshot, options){
        var savable = this._super(snapshot, options);
        savable.place_id = savable.placeID;
        delete savable.placeID;
        return savable;
    }
});

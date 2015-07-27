import AppSerializer from './application';

export default AppSerializer.extend({
    primaryKey: 'restaurantLocationID',
    extractArray(store, type, payload){
        var ignore_indicies = [];

        //can't be done in normalizeHash due to existence of non-created restaurants and created restaurants in same payload
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


            if(!item[this.primaryKey]){
                store.createRecord('restaurant-location', item);
                ignore_indicies.push(index);
            }
        });

        ignore_indicies.forEach((result, index, array) => {
            delete payload['restaurantLocations'][array[index]];
        });
        payload['restaurantLocations'] = payload['restaurantLocations'].filter(Boolean);

        return this._super(store, type, payload);
    },
    serialize(snapshot, options){
        var savable = this._super(snapshot, options);
        savable.place_id = savable.placeID;
        delete savable.placeID;
        return savable;
    }
});

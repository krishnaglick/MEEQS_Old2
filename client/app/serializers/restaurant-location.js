import AppSerializer from './application';

export default AppSerializer.extend({
    primaryKey: 'restaurantLocationID',
    extractArray(store, type, payload){
        var highest_id = -1;

        //can't be done in normalizeHash due to existence of non-created restaurants and created restaurants in same payload
        payload['restaurantLocations'].forEach((result, index, array) => {
            var item = array[index];

            if(item.photos){
                item.photo_reference = item.photos[0].photo_reference;
            }

            item.placeID = item.place_id;
            item.latitude = item.geometry.location.lat;
            item.longitude = item.geometry.location.lng;
            delete item.geometry;
            delete item.place_id;

            //HACK, currently no restaurant associations are bieng handled
            item.types = item.types.filter((type) => {
                return ['food', 'point_of_interest', 'establishment', 'restaurant'].indexOf(type) === -1;
            });
            item.tags = item.types.map((type) => {
                var obj = {};
                obj.name = type;
                return obj;
            });
            
            delete item.types;


            if(!item[this.primaryKey]){
                item.softLoad = true;

                item[this.primaryKey] = highest_id;
                highest_id--;
            }
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

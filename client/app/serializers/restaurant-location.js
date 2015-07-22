import AppSerializer from './application';

export default AppSerializer.extend({
    primaryKey: 'restaurantLocationID',
    extractArray(store, type, payload){
        var highest_id = Math.max.apply(Math, payload['restaurantLocations'].map((result) => {
            return result.restaurantLocationID || 0;
        }));
        var highest_restaurant_id = Math.max.apply(Math, payload['restaurantLocations'].map((result) => {
            return result.restaurant ? (result.restaurant.restaurantID || 0) : 0;
        }));


        //can't be done in normalizeHash due to existence of non-created restaurants and created restaurants in same payload
        payload['restaurantLocations'].forEach((result, index, array) => {
            var item = array[index];

            if(item.photos){
                item.photo_reference = item.photos[0].photo_reference;
            }

            if(!item[this.primaryKey]){
                item.softLoad = true;
                item.restaurant = {
                    restaurantID: highest_restaurant_id,
                    name: item.name
                };
                item.types = item.types.filter((type) => {
                    return ['food', 'point_of_interest', 'establishment', 'restaurant'].indexOf(type) === -1;
                });
                item.tags = item.types.map((type) => {
                    var obj = {};
                    obj.name = type;
                    return obj;
                });
                item.placeID = item.place_id;

                delete item.place_id;
                delete item.name;
                delete item.types;

                item[this.primaryKey] = highest_id;
                highest_restaurant_id++;
                highest_id++;
            }
        });

        return this._super(store, type, payload);
    }
});

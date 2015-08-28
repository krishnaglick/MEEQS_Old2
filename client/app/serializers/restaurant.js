import AppSerializer from './application';

export default AppSerializer.extend({
    primaryKey: 'place_id',
    extractArray(store, primaryTypeClass, rawPayload){
        rawPayload['restaurants'].forEach((item) => {
            item.latitude = item.geometry.location.lat;
            item.longitude = item.geometry.location.lng;
            delete item.id;
            delete item.geometry;
        });

        return this._super(store, primaryTypeClass, rawPayload);
    },
});

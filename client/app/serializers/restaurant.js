import AppSerializer from './application';
import DS from 'ember-data';

export default AppSerializer.extend(DS.EmbeddedRecordsMixin, {
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
    attrs: {
        restaurantLocation: { embedded: 'always' }
    }
});

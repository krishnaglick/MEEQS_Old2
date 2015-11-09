import AppSerializer from './application';
import DS from 'ember-data';

export default AppSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: 'restaurantLocationID',
    attrs: {
        restaurantLocationID: { serialize: false },
        ratings: { deserialize: 'records', serialize: false },
        tags: { deserialize: 'records', serialize: 'ids' },
        restaurant: { key: 'place_id' }
    }
});

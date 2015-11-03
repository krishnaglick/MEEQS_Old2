import AppSerializer from './application';
import DS from 'ember-data';

export default AppSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: 'restaurantLocationID',
    attrs: {
        ratings: { deserialize: 'records', serialize: false },
        tags: { deserialize: 'records', serialize: false },
        restaurant: { key: 'place_id' }
    }
});

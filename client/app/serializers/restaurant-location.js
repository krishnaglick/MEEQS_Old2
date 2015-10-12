import AppSerializer from './application';
import DS from 'ember-data';

export default AppSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: 'restaurantLocationID',
    attrs: {
        ratings: { embedded: 'always' },
        restaurant: { key: 'place_id' }
    }
});

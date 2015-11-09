import DS from 'ember-data';
import AppSerializer from './application';

export default AppSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: 'tagID',
    attrs: {
        tagID: { serialize: false },
        restaurantLocations: { deserialize: false, serialize: 'ids' }
    }
});

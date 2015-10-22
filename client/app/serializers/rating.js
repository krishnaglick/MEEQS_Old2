import DS from 'ember-data';
import AppSerializer from './application';

export default AppSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: 'ratingID',
    attrs: {
        user: { deserialize: 'records', serialize: 'ids' },
        createdAt: { serialize: false },
        averageRating: { serialize: false }
    }
});

import AppSerializer from './application';
import DS from 'ember-data';

export default AppSerializer.extend(DS.EmbeddedRecordsMixin, {
    primaryKey: 'userID',
    attrs: {
        userID: { serialize: false },
        isAdmin: { serialize: false },
        isVerified: { serialize: false }
    }
});

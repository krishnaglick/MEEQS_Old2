import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:passport',
    coalesceFindRequests: true,
    namespace: 'api/v1',
    pathForType(modelName){
        let camelCase = modelName.replace(/-([a-z])/g, function (m, w) {
            return w.toUpperCase();
        });
        return Ember.String.pluralize(camelCase);
    }
});

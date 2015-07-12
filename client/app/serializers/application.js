import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    serializeIntoHash(hash, type, record, options) {
        var pluralTypeKey = Ember.Inflector.inflector.pluralize(type.typeKey);
        hash[pluralTypeKey] = this.serialize(record, options);
    }
});

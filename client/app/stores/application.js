import DS from 'ember-data';

export default DS.Store.extend({
    push(modelName, data){
        Ember.assert("Expected an object as `data` in a call to `push` for " + modelName + " , but was " + data, Ember.typeOf(data) === 'object');
        //Ember.assert("You must include an `id` for " + modelName + " in an object passed to `push`", data.id != null && data.id !== '');

        var type = this.modelFor(modelName);
        var filter = Ember.EnumerableUtils.filter;

        // If Ember.ENV.DS_WARN_ON_UNKNOWN_KEYS is set to true and the payload
        // contains unknown keys, log a warning.
        if (Ember.ENV.DS_WARN_ON_UNKNOWN_KEYS) {
          Ember.warn("The payload for '" + type.modelName + "' contains these unknown keys: " +
            Ember.inspect(filter(Ember.keys(data), function(key) {
              return !(key === 'id' || key === 'links' || ember$data$lib$system$store$$get(type, 'fields').has(key) || key.match(/Type$/));
            })) + ". Make sure they've been defined in your model.",
            filter(Ember.keys(data), function(key) {
              return !(key === 'id' || key === 'links' || ember$data$lib$system$store$$get(type, 'fields').has(key) || key.match(/Type$/));
            }).length === 0
          );
        }

        // Actually load the record into the store.

        this._load(type, data);

        var record = this.recordForId(type, data.id);
        var store = this;

        this._backburner.join(function() {
          store._backburner.schedule('normalizeRelationships', store, '_setupRelationships', record, type, data);
        });

        return record;
    }
});

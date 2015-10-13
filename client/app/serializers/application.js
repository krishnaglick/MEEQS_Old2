import Ember from 'ember';
import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    normalizeId(hash){
        var primaryKey = Ember.get(this, 'primaryKey');
        if (primaryKey === 'id') { return; }
        hash.id = hash[primaryKey];
    }
});

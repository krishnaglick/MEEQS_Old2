import DS from 'ember-data';

export default DS.Model.extend({
    roleID: DS.attr('number'),
    roleName: DS.attr('string')
});

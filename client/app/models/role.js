import DS from 'ember-data';

export default DS.Model.extend({
  roleID: DS.attr(),
  roleName: DS.attr('string')
});

import DS from 'ember-data';

export default DS.Model.extend({
  tagCategoryID: DS.attr(),
  name: DS.attr(),
  description: DS.attr('string')
});

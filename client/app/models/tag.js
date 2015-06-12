import DS from 'ember-data';

export default DS.Model.extend({
  tagID: DS.attr(),
  name: DS.attr(),
  tagCategoryID: DS.attr('number')
});

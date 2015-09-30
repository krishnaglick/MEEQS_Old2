import DS from 'ember-data';

export default DS.Model.extend({
    tagID: DS.attr(),
    name: DS.attr('string'),
    tagCategoryID: DS.attr('number')
});

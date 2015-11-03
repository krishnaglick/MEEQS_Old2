import DS from 'ember-data';

export default DS.Model.extend({
    tagCategoryID: DS.attr('number'),
    name: DS.attr('string'),
    description: DS.attr('string')
});

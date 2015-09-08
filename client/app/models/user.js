
import DS from 'ember-data';

export default DS.Model.extend({
    userID: DS.attr(),
    username: DS.attr(),
    displayName: DS.attr(),
    password: DS.attr(),
    email: DS.attr(),
    isVerified: DS.attr('boolean'),
    isAdmin: DS.attr('boolean')
});

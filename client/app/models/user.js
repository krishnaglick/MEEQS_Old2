import Ember from 'ember';
import DS from 'ember-data';
import config from 'client/config/environment';

export default DS.Model.extend({
    userID: DS.attr('number'),
    displayName: DS.attr('string'),
    avatar: DS.attr('string'),
    email: DS.attr('string'),
    isVerified: DS.attr('boolean'),
    isAdmin: DS.attr('boolean'),

    displayImage: Ember.computed('avatar', function(){
        return this.get('avatar') || config.APP.DEFAULT_AVATAR;
    })
});

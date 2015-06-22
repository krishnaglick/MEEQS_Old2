import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.token)) {
                Ember.$.ajax({
                    url: '/validate',
                    type: 'POST',
                    data: JSON.stringify({
                        token: data.token
                    }),
                    contentType: 'application/json'
                }).then(function() {
                    resolve(data);
                }, function(err) {
                    reject(err);
                });
            } else {
                reject();
            }
        });
    },
    authenticate: function(credentials) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                url: '/login',
                type: 'POST',
                data: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password
                }),
                contentType: 'application/json'
            }).then(function(response, data1, data2) {
                Ember.run(function() {
                    if(response.user){
                        resolve({ token: response.token, user: response.user });
                    } else {
                        reject()
                    }
                });
            }, function(xhr, status, error) {
                Ember.run(function() {
                    reject(error);
                });
            });
        });
    },
    invalidate: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            Ember.$.ajax({
                url: '/logout',
                type: 'GET'
            }).then(function() {
                Ember.run(function() {
                    resolve();
                });
            }, function(err) {
                Ember.run(function() {
                    reject(err);
                });
            });
        });
    }
});

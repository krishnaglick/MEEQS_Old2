import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';

export default Base.extend({
    restore(data){
        return new Ember.RSVP.Promise((resolve, reject) => {
            if (!Ember.isEmpty(data.token)) {
                Ember.$.ajax({
                    url: '/validate',
                    type: 'POST',
                    data: JSON.stringify({
                        token: data.token
                    }),
                    contentType: 'application/json'
                }).then(() => {
                    resolve(data);
                }, (err) => {
                    reject(err);
                });
            } else {
                reject();
            }
        });
    },
    authenticate(credentials){
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                url: '/login',
                type: 'POST',
                data: JSON.stringify({
                    username: credentials.username,
                    password: credentials.password
                }),
                contentType: 'application/json'
            }).then((response) => {
                Ember.run(() => {
                    if(response.user){
                        resolve({ token: response.token, user: response.user });
                    } else {
                        reject(response.message);
                    }
                });
            }, (xhr) => {
                Ember.run(() => {
                    reject(xhr.responseJSON.message);
                });
            });
        });
    },
    invalidate(){
        return new Ember.RSVP.Promise((resolve, reject) => {
            Ember.$.ajax({
                url: '/logout',
                type: 'GET'
            }).then(() => {
                Ember.run(() => {
                    resolve();
                });
            }, (xhr) => {
                Ember.run(() => {
                    reject(xhr.responseJSON.message);
                });
            });
        });
    }
});

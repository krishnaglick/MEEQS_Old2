import Ember from 'ember';
import PassportAuthenticator from '../authenticators/passport';
import PassportAuthorizer from '../authorizers/passport';

export function initialize(container, application){
    application.register('authenticator:passport', PassportAuthenticator);
    application.register('authorizer:passport', PassportAuthorizer);
}

export default Ember.Application.initializer({
    name: 'authentication',
    before: 'simple-auth',
    initialize: initialize
});

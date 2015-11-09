import Ember from 'ember';
import PassportAuthenticator from '../authenticators/passport';
import PassportAuthorizer from '../authorizers/passport';


export function initialize(container, application) {
    container.register('authenticator:passport', PassportAuthenticator);
    container.register('authorizer:passport', PassportAuthorizer);

    application.inject('controller', 'session', 'service:session');
    application.inject('component', 'session', 'service:session');
}

export default Ember.Application.initializer({
    name: 'authorization',
    before: 'ember-simple-auth',
    initialize: initialize
});

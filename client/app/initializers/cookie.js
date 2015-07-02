import Ember from 'ember';


export function initialize(container, application) {
    application.inject('controller', 'cookie', 'cookie:main');
}

export default Ember.Application.initializer({
    name: 'cookie-initializer',
    after: 'cookie',
    initialize: initialize
});

import Ember from 'ember';


export function initialize(container, application) {
    application.inject('controller', 'cookie', 'cookie:main');
    application.inject('service', 'cookie', 'cookie:main');
}

export default Ember.Application.initializer({
    name: 'cookies',
    after: ['cookie'],
    initialize: initialize
});

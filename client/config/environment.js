/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'client',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    ENV.contentSecurityPolicy = {
        'default-src': "'none'",
        'script-src': "'self' 'unsafe-eval' http://maps.googleapis.com http://maps.gstatic.com https://cdn.mxpnl.com", // Allow scripts from https://cdn.mxpnl.com
        'font-src': "'self' https://fonts.gstatic.com http://fonts.gstatic.com data:", // Allow fonts to be loaded from http://fonts.gstatic.com
        'connect-src': "'self' http://localhost:1337 https://api.mixpanel.com", // Allow data (ajax/websocket) from api.mixpanel.com and custom-api.local
        'img-src': "'self' http://placehold.it/ https://placeholdit.imgix.net/ https://maps.googleapis.com https://lh1.googleusercontent.com https://lh2.googleusercontent.com https://lh3.googleusercontent.com https://lh4.googleusercontent.com https://lh5.googleusercontent.com https://lh6.googleusercontent.com",
        'style-src': "'self' 'unsafe-inline' http://fonts.googleapis.com https://fonts.googleapis.com", // Allow inline styles and loaded CSS from http://fonts.googleapis.com 
        'media-src': "'self'"
    };

    ENV['simple-auth'] = {
        authorizer: 'authorizer:passport',
        store: 'simple-auth-session-store:cookie'
    };

    ENV.GOOGLE = {
        API_KEY: "AIzaSyALJ2HzrbmrjgIMRKu7VzcY3508_6FcVWU",
        PHOTO_WIDTH: 480,
        PHOTO_HEIGHT: 640,
        DEFAULT_PHOTO: "http://placehold.it/300x200"
    };


    return ENV;
};

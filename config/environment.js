/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'artic-demo',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    apiHost: 'http://localhost:4500/api',
    contentSecurityPolicy: {
      'connect-src': "self' http://localhost:4500/api"
    },
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

  if(environment === 'production') {
    apiHost: 'http://frost.ciena.com:4500/api'
  }

  if (environment === 'development') {
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    ENV.APP.LOG_TRANSITIONS = true;
    ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';
    ENV.apiHost = '';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'development') {
    ENV['ember-cli-mirage'] = {
       enabled: false
     }
  }

  return ENV;
};

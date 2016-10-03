define('artic-demo/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'artic-demo/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _articDemoConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_articDemoConfigEnvironment['default'].APP.name, _articDemoConfigEnvironment['default'].APP.version)
  };
});
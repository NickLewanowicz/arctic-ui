define('artic-demo/tests/helpers/start-app', ['exports', 'ember', 'artic-demo/app', 'artic-demo/config/environment'], function (exports, _ember, _articDemoApp, _articDemoConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _articDemoConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _articDemoApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
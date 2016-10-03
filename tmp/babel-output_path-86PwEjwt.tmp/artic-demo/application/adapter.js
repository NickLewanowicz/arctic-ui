define('artic-demo/application/adapter', ['exports', 'ember-data', 'artic-demo/config/environment'], function (exports, _emberData, _articDemoConfigEnvironment) {
  exports['default'] = _emberData['default'].JSONAPIAdapter.extend({
    host: _articDemoConfigEnvironment['default'].apiHost

  });
});
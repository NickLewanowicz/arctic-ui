define('artic-demo/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'artic-demo/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _articDemoConfigEnvironment) {

  var name = _articDemoConfigEnvironment['default'].APP.name;
  var version = _articDemoConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
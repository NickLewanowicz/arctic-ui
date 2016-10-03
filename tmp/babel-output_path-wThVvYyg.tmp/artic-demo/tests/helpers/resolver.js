define('artic-demo/tests/helpers/resolver', ['exports', 'artic-demo/resolver', 'artic-demo/config/environment'], function (exports, _articDemoResolver, _articDemoConfigEnvironment) {

  var resolver = _articDemoResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _articDemoConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _articDemoConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
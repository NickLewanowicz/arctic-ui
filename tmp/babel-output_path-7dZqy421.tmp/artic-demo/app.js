define('artic-demo/app', ['exports', 'ember', 'artic-demo/resolver', 'ember-load-initializers', 'artic-demo/config/environment'], function (exports, _ember, _articDemoResolver, _emberLoadInitializers, _articDemoConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _articDemoConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _articDemoConfigEnvironment['default'].podModulePrefix,
    Resolver: _articDemoResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _articDemoConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
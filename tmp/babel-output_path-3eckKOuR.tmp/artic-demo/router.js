define('artic-demo/router', ['exports', 'ember', 'artic-demo/config/environment'], function (exports, _ember, _articDemoConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _articDemoConfigEnvironment['default'].locationType,
    rootURL: _articDemoConfigEnvironment['default'].rootURL
  });

  Router.map(function () {
    this.route('login');

    this.route('repositories', function () {
      this.route('repository', { path: ':id' }, function () {
        this.route('info');
      });
    });
    this.route('repository', { path: ':id' }, function () {});
  });

  exports['default'] = Router;
});
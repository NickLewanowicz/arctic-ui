define('artic-demo/models/repository', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    user: _emberData['default'].attr('string'),
    name: _emberData['default'].attr('string'),
    version: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    dependencies: _emberData['default'].hasMany('repositories')
  });
});
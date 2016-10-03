define('artic-demo/models/project', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    repos: _emberData['default'].hasMany('repositories')
  });
});
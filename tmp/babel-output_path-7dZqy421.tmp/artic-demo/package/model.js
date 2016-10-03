define('artic-demo/package/model', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    dependencies: _emberData['default'].hasMany('dependencies')
  });
});
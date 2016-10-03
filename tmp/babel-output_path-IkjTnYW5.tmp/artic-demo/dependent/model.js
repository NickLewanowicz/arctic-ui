define('artic-demo/dependent/model', ['exports', 'ember-data'], function (exports, _emberData) {
  exports['default'] = _emberData['default'].Model.extend({
    name: _emberData['default'].attr('string'),
    version: _emberData['default'].attr('string')
  });
});
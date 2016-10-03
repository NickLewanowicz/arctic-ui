define('artic-demo/projectlink/model', ['exports', 'ember-data', 'artic-demo/dependent/model'], function (exports, _emberData, _articDemoDependentModel) {
  exports['default'] = _emberData['default'].Model.extend({
    user: _emberData['default'].attr('string'),
    repo: _emberData['default'].attr('string'),
    version: _emberData['default'].attr('string'),
    description: _emberData['default'].attr('string'),
    dependencies: _emberData['default'].attr()
  });
});
define('artic-demo/repositories/repository/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model(params) {
      var repo = this.store.find('repository', params.id);
      return repo;
    }

  });
});
define('artic-demo/index/route', ['exports', 'ember', 'artic-demo/models/repository', 'artic-demo/config/environment'], function (exports, _ember, _articDemoModelsRepository, _articDemoConfigEnvironment) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var repositories = this.store.findAll('repository');
      return repositories;
    },

    actions: {
      addProject: function addProject() {
        var inputUrl = this.get('controller').get('projectUrl');
        //Store the data ar a projectlink model
        var projectObj = this.store.createRecord('repository', {
          link: inputUrl
        });

        //Save the model to the database
        projectObj.save();
      }

    }
  });
});
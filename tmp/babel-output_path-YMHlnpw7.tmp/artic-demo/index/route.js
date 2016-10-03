define('artic-demo/index/route', ['exports', 'ember', 'artic-demo/projectlink/model', 'artic-demo/config/environment'], function (exports, _ember, _articDemoProjectlinkModel, _articDemoConfigEnvironment) {
  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var projectList = this.store.findAll('projectlink');
      return projectList;
    },

    actions: {
      addProject: function addProject() {
        var inputUrl = this.get('controller').get('projectUrl');
        //Store the data ar a projectlink model
        var projectObj = this.store.createRecord('projectlink', {
          link: this.get('controller').get('projectUrl')
        });

        //Save the model to the database
        projectObj.save();
      }

    }
  });
});
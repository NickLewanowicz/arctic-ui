define('artic-demo/repositories/index/route', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Route.extend({

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
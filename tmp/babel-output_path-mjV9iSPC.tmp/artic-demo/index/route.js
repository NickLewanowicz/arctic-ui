define('artic-demo/index/route', ['exports', 'ember', 'artic-demo/projectlink/model'], function (exports, _ember, _articDemoProjectlinkModel) {
  //import ENV from '../config/environment';

  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      var projectList = this.store.findAll('projectlink');

      return projectList;
    },

    actions: {
      addProject: function addProject() {
        var inputUrl = this.get('controller').get('projectUrl');
        console.log(inputUrl);

        //If user included a http at the begining this strips it.
        if (inputUrl.search('//')) {
          inputUrl = inputUrl.split('//')[1];
        }

        //Split the url into the sections for the projectlink model
        inputUrl = inputUrl.split('/');
        var host = inputUrl[0];
        var inputUser = inputUrl[1];
        var inputRepo = inputUrl[2];

        //Store the data ar a projectlink model
        var projectObj = this.store.createRecord('projectlink', {
          user: inputUser,
          repo: inputRepo,
          version: "",
          description: "",
          dependencies: []
        });

        //Save the model to the database
        projectObj.save();
      }

    }
  });
});
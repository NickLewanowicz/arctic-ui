define('artic-demo/index/route', ['exports', 'ember'], function (exports, _ember) {
  //import ENV from '../config/environment';

  exports['default'] = _ember['default'].Route.extend({
    model: function model() {
      //		return this.store.createRecord('project-link',);
    },

    actions: {
      addProject: function addProject() {
        var packageExtension = "/blob/master/package.json";
        var controller = this.get('controller');
        var inputUrl = controller.get('projectUrl');
        var newProjectUrl = inputUrl + packageExtension;
        var projectList = controller.addedProjects;
        projectList.pushObject(newProjectUrl);
        var projectObj = this.store.createRecord('projectlink', {
          link: newProjectUrl
        });
        projectObj.save();
        console.log(projectObj);
      }

    }
  });
});
import Ember from 'ember';

export default Ember.Route.extend({

  actions: {
    addProject: function(){
      var inputUrl = (this.get('controller').get('projectUrl'));
      //Store the data ar a projectlink model
      const projectObj = this.store.createRecord('repository', {
        link: inputUrl,
      });

      //Save the model to the database
      projectObj.save()
    },
  }
});

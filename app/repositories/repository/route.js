import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    var repo = this.store.find('repository', params.id);
      return repo
  },


});

import Ember from 'ember';
import RSVP from 'rsvp';

const {
  get
} = Ember

export default Ember.Route.extend({
  model () {
    return RSVP.hash({
      repositories: get(this, 'store').findAll('repository'),
      versions: get(this, 'store').findAll('version'),
    })
  },
  actions: {
    willTransition: function(transition) {
      if(transition.targetName === 'index'){
        this.controllerFor('application').set('bigSearch', true)
        this.controllerFor('application').set('searchTerm', '')
        this.controllerFor('application').set('repoFilter', '')
      }else{
        this.controllerFor('application').set('bigSearch', false)
        this.controllerFor('application').set('repoFilter', '')
      }
    }
  }
});

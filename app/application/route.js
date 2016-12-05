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
    newSearch(){
      if(this.controllerFor('application').get('repoFilter') === ''){
        this.controllerFor('application').set('bigSearch', true)
        this.transitionTo('index')
        this.controllerFor('application').set('searchTerm', this.controllerFor('application').get('repoFilter'))
      }else{
        this.transitionTo('index')
        this.controllerFor('application').set('searchTerm', this.controllerFor('application').get('repoFilter'))
      }
    },
    willTransition: function(transition) {
      if(transition.targetName === 'index'){
        if(this.controllerFor('application').get('searchTerm') === ''){
          this.controllerFor('application').set('bigSearch', true)
        }
      }else{
        this.controllerFor('application').set('bigSearch', false)
        this.controllerFor('application').set('repoFilter', '')
      }
    },
    didTransition: function(){
      if(this.controllerFor('application').get('searchTerm') !== ''){
        this.controllerFor('application').set('bigSearch', false)
      }
    },
  }
});

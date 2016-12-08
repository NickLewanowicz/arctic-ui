import Ember from 'ember';
import RSVP from 'rsvp';
const {
  Route,
  get
} = Ember

export default Route.extend({
  model (params) {
    let repository = get(this, 'store').find('repository', params.id)
    let isdependency= get(this,'store').find('isdependency', params.id)
    this.controllerFor('repositories.repository').set('basicTabsSelection', 'dependencies')
    return RSVP.hash({
      repository: repository,
      isdependency: isdependency,
    })
  },
  actions:{
    error(error, transition) {
      if (error) {
        Materialize.toast('Unable to load repository!', 4000)
      }
    }
  }
})

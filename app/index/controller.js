import Ember from 'ember'

const {
  Controller,
  computed,
  get
} = Ember

export default Controller.extend({
  appController: Ember.inject.controller('application'),
  repoFilter: Ember.computed('appController.searchTerm', function(){
    this.set('page', 1)
    return this.get('appController.searchTerm')
  }),
  filteredModel: computed('model', 'repoFilter', 'ciena-frost', 'bp-frost', 'bp-ui-apps', 'ciena-blueplanet','otherOrg',function () {
    const model = get(this, 'model.repositories')
    var filter = get(this, 'repoFilter'),
        cienaFrostChecked = get(this, 'ciena-frost'),
        bpFrostChecked = get(this, 'bp-frost'),
        bpUiAppsChecked = get(this, 'bp-ui-apps'),
        cienaBpChecked = get(this, 'ciena-blueplanet'),
        otherChecked = get(this, 'otherOrg'),
        orgFilter = [],
        otherFilter = ['ciena-frost', 'BP_FROST', 'BP_UI_APPS', 'ciena-blueplanet']

    if(filter){
      filter.toLowerCase()
    }
    cienaFrostChecked ? orgFilter.addObject('ciena-frost') : orgFilter.removeObject('ciena-frost')
    bpFrostChecked ? orgFilter.addObject('BP_FROST') : orgFilter.removeObject('BP_FROST')
    bpUiAppsChecked ? orgFilter.addObject('BP_UI_APPS') : orgFilter.removeObject('BP_UI_APPS')
    cienaBpChecked ? orgFilter.addObject('ciena-blueplanet') : orgFilter.removeObject('ciena-blueplanet')

    this.get('appController').toggleSearch

    if(!filter){
      filter = ''
    }
    return model.filter(repo => {
      return Object.keys(repo).some(key => {
        if (typeof repo[key] !== 'string'){
          return false
        }else if(((otherChecked && !(otherFilter.indexOf(repo.data.organization) > -1)) || (!otherChecked && (orgFilter.length === 0 || !(orgFilter.indexOf(repo.data.organization) === -1)))) && repo[key].indexOf(filter) > -1){
          return true
        }else{
          return false
        }
      })
    })
  }),
  repoPages: Ember.computed('filteredModel',function(){
    let repos = this.get('filteredModel')
    let pages = []
    for (var i = 0; repos.length > i; i+=15) {
      let temparray = repos.slice(i,i+15)
      pages.push(temparray)
    }
    return pages;
  }),
  page: 1,
  currentPage: Ember.computed('repoPages','page',function(){
    let repos = this.get('repoPages')
    let page = this.get('page')

    return repos.objectAt(page-1);
  }),
  actions: {
    smallSearch(){
      this.set('appController.bigSearch', false)
    },
  }
})

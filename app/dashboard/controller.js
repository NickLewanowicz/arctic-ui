import Ember from 'ember'

const {
  Controller,
  computed,
  get
} = Ember

export default Controller.extend({
  appController: Ember.inject.controller('application'),
  repoFilter: computed('appController.searchTerm', function(){
    this.set('page', 1)
    return this.get('appController.searchTerm')
  }),
  sortRepositories: computed.sort('filteredModel', function(a, b){
    var aVersion = get(a, 'versions.lastObject'),
        bVersion = get(b, 'versions.lastObject'),
        ecosystem = get(this, 'radioSelection'),
        range = get(this,'complianceRange')

    if(ecosystem){
      if (aVersion.data.compliantpercent[ecosystem][0] / (aVersion.data.compliantpercent[ecosystem][1] + aVersion.data.compliantpercent[ecosystem][1]) >
          bVersion.data.compliantpercent[ecosystem][0] / (bVersion.data.compliantpercent[ecosystem][1] + bVersion.data.compliantpercent[ecosystem][1])) {
        return 1;
      } else if (aVersion.data.compliantpercent[ecosystem][0] / (aVersion.data.compliantpercent[ecosystem][1] + aVersion.data.compliantpercent[ecosystem][1]) <
          bVersion.data.compliantpercent[ecosystem][0] / (bVersion.data.compliantpercent[ecosystem][1] + bVersion.data.compliantpercent[ecosystem][1])) {
        return -1;
      }
      return 0;
    }else if(range){
      if(Object.keys(aVersion.data.compliantpercent).length === 0 && Object.keys(bVersion.data.compliantpercent).length === 0){
        return 0
      }else if(Object.keys(aVersion.data.compliantpercent).length === 0){
        return 1
      }else if (Object.keys(bVersion.data.compliantpercent).length === 0) {
        return -1
      }else{
        if(aVersion.data.name > bVersion.data.name){
          return 1
        }else if (aVersion.data.name < bVersion.data.name) {
          return -1
        }else{
          return 0
        }
      }
    }else{
      if (aVersion.data.name > bVersion.data.name) {
        return 1;
      } else if (aVersion.data.name < bVersion.data.name) {
        return -1;
      }
      return 0;
    }
 }),
  filteredModel: computed('model', 'repoFilter', 'ember-frost-ecosystem','ember-cli-ember-ecosystem', 'radioSelection', 'complianceRange',function () {
    const model = get(this, 'model.repositories')
    var filter = get(this, 'repoFilter'),
        ecosystem = get(this, 'radioSelection'),
        range = get(this,'complianceRange'),
        wlFilter = ['ciena-frost', 'BP_FROST', 'BP_UI_APPS', 'ciena-blueplanet']

    this.get('appController').toggleSearch
    this.set('page', 1)
    if(!filter){
      filter = ''
    }else{
      filter = filter.toLowerCase()
    }
    return model.filter(repo => {
      return Object.keys(repo).some(key => {
        var repoVersion = get(repo, 'versions.lastObject')
        if(repoVersion){
          var ecoCompliant = get(repoVersion, 'data.compliantpercent')
        }

        if(ecosystem && ecoCompliant){
          if(!ecoCompliant[ecosystem]){
            return false
          }else if(ecoCompliant[ecosystem][0]/(ecoCompliant[ecosystem][0]+ecoCompliant[ecosystem][1])*100 > range){
            return false
          }
        }else{
          for(var eco in ecoCompliant){
            if(eco && (ecoCompliant[eco][0]/(ecoCompliant[eco][0]+ecoCompliant[eco][1])*100 > range)){
              return false
            }
          }
        }
        if (typeof repo[key] !== 'string' || !(wlFilter.indexOf(repo.data.organization) > -1)){
          return false
        }else if(repo[key].indexOf(filter) > -1 && repoVersion.data.compliantpercent){
          return true
        }else{
          return false
        }
      })
    })
  }),
  repoPages: Ember.computed('sortRepositories',function(){
    let repos = this.get('sortRepositories')
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
})

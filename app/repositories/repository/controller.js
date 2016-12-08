import Ember from 'ember'

const {
  Controller,
  computed,
  get
} = Ember

export default Controller.extend({
  basicTabsContent:  [ {id: 'dependencies', title: 'Dependencies'},
                       {id: 'usedby', title: 'Using Me'} ],
  basicTabsSelection: "dependencies",
  isDepFilteredModel: computed('model', 'depFilter',function () {
    const model = get(this, 'model.isdependency.isdependencies')
    var theFilter = get(this, 'depFilter')
    if(!theFilter){
     theFilter = ''
    }else{
      theFilter = theFilter.toLowerCase()
    }

    return model.filter(repo => {
      return Object.keys(repo).some(key => {
        if (typeof repo[key] !== 'string'){
          return false
        }else if(repo[key].toLowerCase().indexOf(theFilter) > -1 || repo.data.organization.toLowerCase().indexOf(theFilter) > -1){
          return true
        }else{
          return false
        }
      })
    })

  })
})

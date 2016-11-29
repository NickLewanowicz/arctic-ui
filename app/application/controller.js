import Ember from 'ember';
import RSVP from 'rsvp';

const {
  computed,
  get
} = Ember

export default Ember.Controller.extend({
  model () {
    return RSVP.hash({
      repositories: get(this, 'store').findAll('repository'),
      versions: get(this, 'store').findAll('version'),
    })
  },
  bigSearch: false,
  addRepo: false,
  searchTerm: '',
  reset: Ember.computed('repoFilter', function(){
     var temp = get(this,'repoFilter')
     if(temp === ''){
       this.set('bigSearch', true);
     }
   }),
  filteredModel: computed('model', 'repoFilter',function () {
    const model = get(this, 'model.repositories')
    var filter = get(this, 'repoFilter')

    if(!filter){
      filter = ''
    }

    return model.filter(repo => {
      return Object.keys(repo).some(key => {
        if (typeof repo[key] !== 'string'){
          return false
        }else if(repo[key].indexOf(filter) > -1){
          return true
        }else{
          return false
        }
      })
    })

  }),
  actions: {
    setSearch(){
      var temp = get(this,'repoFilter')
      this.set('bigSearch', false);
      this.set('searchTerm', temp)
    },
    smallSearch(){
      this.set('bigSearch', false)
      this.set('searchTerm', get(this, 'repoFilter'))
    },
    biggerSearch(){
      this.set('bigSearch', true)
      this.set('repoFilter', '')
      this.set('searchTerm', '')
    },
    toggleSearch(){
      this.toggleProperty('bigSearch')
    },
    addRepoDialog(){
      this.toggleProperty('addRepo')
    },
    addNewRepo: function(){
      var link = (this.get('newlink'))
      if(link !== '' && link !== undefined){
        var newRepo = get(this, 'store').createRecord('repository', {link})
        Materialize.toast('Repository added to database!', 4000)
        newRepo.save()
      }else{
        Materialize.toast('Error: Repository Not Added', 4000)
      }
      this.set('addRepo', false)
      this.set('newlink', '')
    }
  }
});

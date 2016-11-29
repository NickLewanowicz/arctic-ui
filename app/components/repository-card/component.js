import Ember from 'ember';

export default Ember.Component.extend({
  click: function() {
    this.sendAction();
  },
  actions: {
    imagePath() {
      return 'assets/images/github.svg'
    }
  }
});

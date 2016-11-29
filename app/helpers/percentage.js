import Ember from 'ember';

export function percentage(params) {
  return params.reduce((a, b) => {
    return Math.round(a / b *100)
  });
}

export default Ember.Helper.helper(percentage);

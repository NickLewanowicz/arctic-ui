import DS from 'ember-data';

const {
  Model,
  attr,
  hasMany
} = DS

export default Model.extend({
  isdependencies: hasMany('repository', {inverse: null})
})
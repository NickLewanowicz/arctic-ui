import DS from 'ember-data';

const {
  hasMany
} = DS

export default DS.Model.extend({
  name: DS.attr('string'),
  version: DS.attr('string'),
  compliantpercent: DS.attr(),
  repository: DS.belongsTo('repository', {
    inverse: 'versions'
  }),
  dependencies: hasMany('dependency', {
    inverse: null
  }),
  devdependencies: hasMany('dependency', {
    inverse: null
  }),
  ltsCompliant: hasMany('dependency', {
    inverse: null
  }),
  ltsNonCompliant: hasMany('dependency', {
    inverse: null
  }),
});

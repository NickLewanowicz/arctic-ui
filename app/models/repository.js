import DS from 'ember-data';

export default DS.Model.extend({
  link: DS.attr('string'),
  user: DS.attr('string'),
  name: DS.attr('string'),
  version: DS.attr('string'),
  description: DS.attr('string'),
  isdependency: DS.hasMany('repository', {inverse: 'dependency'}),
  dependency: DS.hasMany('repository', {inverse: 'isdependency'}),

});

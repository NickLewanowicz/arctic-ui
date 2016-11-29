import DS from 'ember-data';

const {
  JSONAPISerializer
} = DS

export default JSONAPISerializer.extend({
  // primaryKey: '_id',
  // serializeId (id) {
  //   return id.toString()
  // }
})

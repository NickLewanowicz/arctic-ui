export { buildOperationUrl };
import Ember from 'ember';

var assert = Ember.assert;

function buildOperationUrl(record, opPath, urlType) {
  var instance = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  assert('You must provide a path for instanceOp', opPath);
  var modelName = record.constructor.modelName || record.constructor.typeKey;
  var adapter = record.store.adapterFor(modelName);
  var path = opPath;
  var snapshot = record._createSnapshot();
  var baseUrl = adapter.buildURL(modelName, instance ? record.get('id') : null, snapshot, urlType);

  if (baseUrl.charAt(baseUrl.length - 1) === '/') {
    return '' + baseUrl + path;
  } else {
    return baseUrl + '/' + path;
  }
}

export default buildOperationUrl;
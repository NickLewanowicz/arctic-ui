

export default instanceOp;
import Ember from 'ember';
import { buildOperationUrl } from './build-url';

var merge = Ember.merge;

function instanceOp(options) {
  return function (payload) {
    var modelName = this.constructor.modelName || this.constructor.typeKey;
    var requestType = (options.type || 'PUT').toUpperCase();
    var urlType = options.urlType || requestType;
    var adapter = this.store.adapterFor(modelName);
    var fullUrl = buildOperationUrl(this, options.path, urlType, false);
    return adapter.ajax(fullUrl, requestType, merge(options.ajaxOptions || {}, { data: payload }));
  };
}
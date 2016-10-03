define('ember-api-actions/utils/member-action', ['exports', 'ember', 'ember-api-actions/utils/build-url'], function (exports, _ember, _emberApiActionsUtilsBuildUrl) {
  'use strict';

  exports['default'] = instanceOp;

  var merge = _ember['default'].merge;

  function instanceOp(options) {
    return function (payload) {
      var modelName = this.constructor.modelName || this.constructor.typeKey;
      var requestType = (options.type || 'PUT').toUpperCase();
      var urlType = options.urlType || requestType;
      var adapter = this.store.adapterFor(modelName);
      var fullUrl = (0, _emberApiActionsUtilsBuildUrl.buildOperationUrl)(this, options.path, urlType);
      return adapter.ajax(fullUrl, requestType, merge(options.ajaxOptions || {}, { data: payload }));
    };
  }
});
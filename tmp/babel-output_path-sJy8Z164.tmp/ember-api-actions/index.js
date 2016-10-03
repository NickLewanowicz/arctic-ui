define('ember-api-actions/index', ['exports', 'ember-api-actions/utils/member-action', 'ember-api-actions/utils/collection-action'], function (exports, _emberApiActionsUtilsMemberAction, _emberApiActionsUtilsCollectionAction) {
  'use strict';

  var classOp = _emberApiActionsUtilsCollectionAction['default'];
  exports.classOp = classOp;

  var instanceOp = _emberApiActionsUtilsMemberAction['default'];

  exports.instanceOp = instanceOp;
  exports.collectionAction = _emberApiActionsUtilsCollectionAction['default'];
  exports.memberAction = _emberApiActionsUtilsMemberAction['default'];
});
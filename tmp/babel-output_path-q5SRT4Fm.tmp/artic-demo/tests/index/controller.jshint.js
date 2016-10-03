define('artic-demo/tests/index/controller.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | index/controller.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'index/controller.js should pass jshint.\nindex/controller.js: line 2, col 8, \'ENV\' is defined but never used.\n\n1 error');
  });
});
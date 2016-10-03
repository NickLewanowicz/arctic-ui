define('artic-demo/tests/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'index/route.js should pass jshint.\nindex/route.js: line 11, col 57, Missing semicolon.\nindex/route.js: line 20, col 24, Missing semicolon.\n\n2 errors');
  });
});
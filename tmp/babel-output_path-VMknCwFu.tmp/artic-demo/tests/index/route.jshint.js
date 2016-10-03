define('artic-demo/tests/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'index/route.js should pass jshint.\nindex/route.js: line 8, col 25, Missing semicolon.\nindex/route.js: line 18, col 45, Missing semicolon.\nindex/route.js: line 22, col 37, Missing semicolon.\nindex/route.js: line 37, col 24, Missing semicolon.\nindex/route.js: line 23, col 11, \'host\' is defined but never used.\nindex/route.js: line 2, col 8, \'projectlink\' is defined but never used.\nindex/route.js: line 3, col 8, \'ENV\' is defined but never used.\n\n7 errors');
  });
});
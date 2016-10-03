define('artic-demo/tests/repositories/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | repositories/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'repositories/route.js should pass jshint.\nrepositories/route.js: line 8, col 26, Missing semicolon.\nrepositories/route.js: line 20, col 24, Missing semicolon.\nrepositories/route.js: line 2, col 8, \'repository\' is defined but never used.\nrepositories/route.js: line 3, col 8, \'ENV\' is defined but never used.\n\n4 errors');
  });
});
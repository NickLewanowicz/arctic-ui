QUnit.module('JSHint | index/route.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'index/route.js should pass jshint.\nindex/route.js: line 9, col 23, Missing semicolon.\nindex/route.js: line 20, col 45, Missing semicolon.\nindex/route.js: line 24, col 37, Missing semicolon.\nindex/route.js: line 39, col 24, Missing semicolon.\nindex/route.js: line 25, col 11, \'host\' is defined but never used.\nindex/route.js: line 2, col 8, \'projectlink\' is defined but never used.\n\n6 errors');
});

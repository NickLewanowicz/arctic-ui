QUnit.module('JSHint | index/route.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'index/route.js should pass jshint.\nindex/route.js: line 8, col 26, Missing semicolon.\nindex/route.js: line 22, col 24, Missing semicolon.\nindex/route.js: line 2, col 8, \'repository\' is defined but never used.\nindex/route.js: line 3, col 8, \'ENV\' is defined but never used.\n\n4 errors');
});

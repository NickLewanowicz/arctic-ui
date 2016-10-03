QUnit.module('JSHint | application/route.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'application/route.js should pass jshint.\napplication/route.js: line 2, col 8, \'Package\' is defined but never used.\n\n1 error');
});

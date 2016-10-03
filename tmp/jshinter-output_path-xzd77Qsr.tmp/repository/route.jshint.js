QUnit.module('JSHint | repository/route.js');
QUnit.test('should pass jshint', function(assert) {
  assert.expect(1);
  assert.ok(false, 'repository/route.js should pass jshint.\nrepository/route.js: line 6, col 18, Missing semicolon.\n\n1 error');
});

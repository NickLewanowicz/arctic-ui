define('artic-demo/tests/dependencies/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | dependencies/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dependencies/model.js should pass jshint.');
  });
});
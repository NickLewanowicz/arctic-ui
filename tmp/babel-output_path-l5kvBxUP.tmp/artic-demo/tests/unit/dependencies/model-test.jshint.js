define('artic-demo/tests/unit/dependencies/model-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/dependencies/model-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/dependencies/model-test.js should pass jshint.');
  });
});
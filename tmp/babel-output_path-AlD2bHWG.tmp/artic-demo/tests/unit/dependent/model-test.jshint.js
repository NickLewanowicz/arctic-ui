define('artic-demo/tests/unit/dependent/model-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | unit/dependent/model-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/dependent/model-test.js should pass jshint.');
  });
});
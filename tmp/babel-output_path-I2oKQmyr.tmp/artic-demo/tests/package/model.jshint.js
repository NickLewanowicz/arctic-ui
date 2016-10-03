define('artic-demo/tests/package/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | package/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'package/model.js should pass jshint.');
  });
});
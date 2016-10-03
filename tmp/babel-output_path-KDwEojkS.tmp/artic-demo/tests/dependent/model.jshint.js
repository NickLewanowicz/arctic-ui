define('artic-demo/tests/dependent/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | dependent/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'dependent/model.js should pass jshint.');
  });
});
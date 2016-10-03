define('artic-demo/tests/models/repository.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | models/repository.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/repository.js should pass jshint.');
  });
});
define('artic-demo/tests/helpers/async-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | helpers/async-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/async-helper.js should pass jshint.');
  });
});
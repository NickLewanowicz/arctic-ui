define('artic-demo/tests/projectlink/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint | projectlink/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'projectlink/model.js should pass jshint.\nprojectlink/model.js: line 2, col 8, \'Package\' is defined but never used.\n\n1 error');
  });
});
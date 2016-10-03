define('artic-demo/tests/test-helper', ['exports', 'artic-demo/tests/helpers/resolver', 'ember-qunit'], function (exports, _articDemoTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_articDemoTestsHelpersResolver['default']);
});
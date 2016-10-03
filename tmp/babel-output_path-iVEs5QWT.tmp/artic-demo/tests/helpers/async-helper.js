define('artic-demo/tests/helpers/async-helper', ['exports', 'ember'], function (exports, _ember) {

  function submit(app, selector) {
    return triggerEvent(selector, 'submit');
  }

  _ember['default'].Test.registerAsyncHelper('submit', submit);
});
define('mock-socket/helpers/global-object', ['exports'], function (exports) {
  'use strict';

  exports['default'] = retrieveGlobalObject;

  function retrieveGlobalObject() {
    if (typeof window !== 'undefined') {
      return window;
    }

    return typeof process === 'object' && typeof require === 'function' && typeof global === 'object' ? global : this;
  }
});
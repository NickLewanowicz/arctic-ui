define('artic-demo/services/socket-io', ['exports', 'ember-websockets/services/socket-io'], function (exports, _emberWebsocketsServicesSocketIo) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWebsocketsServicesSocketIo['default'];
    }
  });
});